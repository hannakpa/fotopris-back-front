module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define(
    "Usuarios",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },

      nombre: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rol: {
        type: DataTypes.INTEGER,
      },

      //  idioma: DataTypes.STRING,
      // perfil: DataTypes.STRING,
    },
    { tableName: "usuarios", timestamps: false }
  );

  return Usuarios;
};
