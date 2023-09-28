const { DataTypes } = require('sequelize');
const sequelize = require("../configdb");
const Medecin = require('./medcin');
const PrescriptionMedical = require('./prescription_medical');

const Patient = sequelize.define('patient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  sexe: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  poids: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  taille: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  SC: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imc: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  creatininePlasmatique: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clairanceCreatinine: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  serviceHospitalisation: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  motifAdministration: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  typeDeGreffe: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  protocole: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  dateGreffe: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  priseEnCharge: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

Patient.belongsTo(Medecin, {
    foreignKey: 'medecin_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  });

Patient.belongsTo(PrescriptionMedical, {
  foreignKey: 'prescription_medical_id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});

module.exports = Patient;
