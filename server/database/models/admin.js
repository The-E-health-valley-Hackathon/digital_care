const { DataTypes } = require("sequelize");
const sequelize = require("../configdb");

const Admin = sequelize.define("Admin", {
  nom: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { Admin };
