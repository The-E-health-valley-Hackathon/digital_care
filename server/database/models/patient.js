const { DataTypes } = require("sequelize");
const sequelize = require("../configdb");

const Patient = sequelize.define("Patient", {
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
  gender: {
    type: DataTypes.ENUM("homme", "femme"),
    allowNull: false,
  },
  age: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  poids: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  taille: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  corporelle: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  imc: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  plasmatique: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  clairance: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  dateAdmission: DataTypes.DATE,
  dateprotocole: DataTypes.DATE,

   typegreffe: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['auto-greffe', 'Allo-greffe', 'pas-de-greffe']],
    },
  },



  is_approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

});

module.exports = { Patient };