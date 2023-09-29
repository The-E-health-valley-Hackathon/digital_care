const { DataTypes } = require('sequelize');
const sequelize = require('../configdb');
const { Doctor } = require('./medcin');

const Patient = sequelize.define('Patient', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  gender: {
    type: DataTypes.ENUM('homme', 'femme'),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER, // Use DataTypes.INTEGER for age
    allowNull: false,
  },
  poids: {
    type: DataTypes.FLOAT, // Use DataTypes.FLOAT for numeric values like poids
    allowNull: false,
  },
  taille: {
    type: DataTypes.FLOAT, // Use DataTypes.FLOAT for numeric values like taille
    allowNull: false,
  },
  corporelle: {
    type: DataTypes.FLOAT, // Use DataTypes.FLOAT for numeric values like corporelle
    allowNull: false,
  },
  imc: {
    type: DataTypes.FLOAT, // Use DataTypes.FLOAT for numeric values like imc
    allowNull: false,
  },
  plasmatique: {
    type: DataTypes.FLOAT, // Use DataTypes.FLOAT for numeric values like plasmatique
    allowNull: false,
  },
  clairance: {
    type: DataTypes.FLOAT, // Use DataTypes.FLOAT for numeric values like clairance
    allowNull: false,
  },
  dateAdmission: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dateprotocole: {
    type: DataTypes.DATE,
    allowNull: false,
  },

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

Patient.belongsTo(Doctor, { foreignKey: 'doctors_id', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })


module.exports = { Patient };
