// definición de modelo 'Pokemon'
// el modelo es el objeto javascript que nos permite
// relacionarnos con la tabla "pokemons" en la base de datos

module.exports = (sequelize, DataTypes) => {
  const Articulo = sequelize.define(
    "Articulo",
    {
      ///inventarse el nombre que defina al elemento
      //sequelize define vincula todas las funciones a Bicing
      //parte que define el tipo de info de la base de datos de  que se van a importar
      id: {
        //ME SALTA ERROR SI NO DEFINO LA PRIMARY KEY. SEQUELIZE YA LE OTORGA UNA PRIMARY KEY AUTOM'ATICAMENTE. SI LE HE DEFINIDO UNA PK EN LA BASE DE DATOS, TENGO QUE INDICARLE AQUI QUE ESTA ES LA PK PARA QUE NO SALTE ERROR
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      url: DataTypes.STRING,
      categoria: DataTypes.STRING,
    },
    { tableName: "articulos", timestamps: false }
  ); // timestamps false para que no requiera unas columnas que a veces pide...

  return Articulo;
};
