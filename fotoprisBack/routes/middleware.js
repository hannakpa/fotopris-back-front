const jsonwebtoken = require("jsonwebtoken");
const Config = require("../config/config");

const { secretKey } = Config;

const autentica = (req, res, next) => {
  let token = req.headers.authorization || "";

  if (!token) {
    next({ error: "no token" });
  }

  jsonwebtoken.verify(token, secretKey, (error, decoded) => {
    //comprobar que el token sea nuestro y que no est'e caducado
    //cada next hace que se pase a lo siguiente. si el final no hay error, ignora el auterror.
    /// si coge un error, ejecuta el apperror
    if (error) {
      next({ error: "token no serveix" });
    } else {
      const { expiredAt } = decoded;
      if (expiredAt > new Date().getTime()) {
        next(); //
      } else {
        next({ error: "token caducat" });
      }
    }
  });
};

const autError = (err, req, res, next) => {
  res.status(400).json(err);
};

//export { autentica, autError };
module.exports = { autentica, autError };
