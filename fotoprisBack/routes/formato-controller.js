const express = require("express");
const router = express.Router();

//requerimos el index.js de models que inicializa sequelize
const modelos = require("../models/index.js");

// importante: todas las rutas get, post… son relativas a la ruta principal
// de este controlador: /api/formatos

// GET lista de todos los formatos
// vinculamos la ruta /api/formatos a la función declarada
// si todo ok devolveremos un objeto tipo:
//     {ok: true, data: [lista_de_objetos_formatos...]}
// si se produce un error:
//     {ok: false, error: mensaje_de_error}

router.get("/", function (req, res, next) {
  //findAll es un método de sequelize!
  modelos.Formato.findAll({ limit: 500 })
    .then((items) =>
      res.json({
        ok: true,
        data: items,
      })
    )
    .catch((error) =>
      res.json({
        ok: false,
        error: error,
      })
    );
});

module.exports = router;
