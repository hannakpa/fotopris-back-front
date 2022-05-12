const express = require("express");
const { autentica, autError } = require("./middleware");

//bcrypt es un modulo que nos permite encriptar en una dirección
const bcrypt = require("bcrypt");

const model = require("../models/index.js");
const Usuari = model.Usuari;

const jsonwebtoken = require("jsonwebtoken");
const Config = require("../config/config");

const { secretKey, expiredAfter } = Config;

const router = express.Router();

router.post("/login", (req, res) => {
  const response = {};
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ ok: false, msg: "email o password no rebuts" });
  }

  Usuari.findOne({ where: { email } }) //BUSCAR QUE EL USUARIO EXISTA

    .then((usuari) => {
      //SI UAUARIO NO ES NULL
      if (usuari && bcrypt.compareSync(password, usuari.password)) {
        // SI HAY ALGO EN USUARIO Y EL PASS ES EL MISMO QUE USUARI PASSWORD
        //AQU'I HACE LA COMPARACION. COMPARE SYNC ES INCRONO.
        //mirar que el pass coincida
        return usuari;
      } else {
        throw "usuari/password invalids"; //si algo falla disparar un error
      }
    })
    .then((usuari) => {
      response.token = jsonwebtoken.sign(
        //
        {
          expiredAt: new Date().getTime() + expiredAfter,
          email,
          //  perfil: usuari.perfil,
          //  idioma: usuari.idioma,
          nombre: usuari.nombre,
          id: usuari.id,
        },
        secretKey
      );
      response.ok = true;
      res.json(response);
    })
    .catch((err) => res.status(400).json({ ok: false, msg: err }));
});

//ruta con protecci'on del token

//para comprobar que el usuario tiene un token valido para que entre

/* POST registro de usuario */
router.post("/registro", function (req, res, next) {
  const hash = bcrypt.hashSync(req.body.password, 10); //FUNCION QUE ENCRIPTA. CREA PASS DE 10 CARCTERES
  req.body.password = hash;
  res.json({ msg: "mensaje de json a la api" });
  Usuari.create(req.body)
    .then((item) => res.json({ ok: true, data: item }))
    .catch((error) => res.json({ ok: false, error }));
});

//ruta sin protecci'on del token

/* POST CHECK LOGIN */
router.get("/checktoken", [autentica, autError], (req, res) => {
  res.status(200).json({
    ok: true,
    token: req.token, //devolver un dato
  });
});

router.get("/open", (req, res) => {
  res.status(200).json({
    ok: true,
    data: "TOTHOM POT VEURE AIXÒ",
  });
});

module.exports = router;
