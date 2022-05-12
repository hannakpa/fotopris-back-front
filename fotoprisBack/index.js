//carga las librerias
//importamos/requerimos express

const express = require("express");
const cors = require("cors"); //ANADIDO DESPUES DEL CORS

//importamos los controladores que contienen las definiciones de las rutas/controladores

const articuloRoutes = require("./routes/articulo-controller");
const formatoRoutes = require("./routes/formato-controller");
const indexRoutes = require("./routes/index-controller");
const usuariRoutes = require("./routes/usuari-controller");
const { autentica } = require("./routes/middleware");

//creamos una nueva aplicacion express
const app = express();
//necesario para poder recibir datos en json
app.use(express.json());

///se deber'ia importar
app.use(cors()); ///A;ADIDO DESPUES DEL CORS

//la ruta '/' se gestiona en indexController
app.use("/", indexRoutes);

//las rutas que empiecen por el /api/xxxx se dirigirán a xxxController
app.use("/api/articulos", articuloRoutes);
app.use("/api/formatos", formatoRoutes);
app.use("/api/usuari", usuariRoutes);

app.listen(4001, () => console.log(`Express en puerto 4001!`));
