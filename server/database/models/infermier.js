const { DataTypes } = require("sequelize");
const sequelize = require("../configdb");

const Infermier = sequelize.define("Infermier", {
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
  sexe: {
    type: DataTypes.ENUM("male", "female", "other"),
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
  image: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  date_de_naissance: {
    type: DataTypes.DATE,

    allowNull: false,
  },
  numeroDeTelphone: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true,
  },
});


module.exports = { Infermier };
