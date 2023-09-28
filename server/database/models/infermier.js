const { DataTypes } = require('sequelize');
const sequelize = require("../configdb");
const Planning = require('./planning');

const Infermier = sequelize.define('infermier', {
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
  email: {
    type: DataTypes.STRING(95),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(555),
    allowNull: false,
  },
  mot_de_passe: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  date_de_naissance: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  numeroDeTelphone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Infermier.hasMany(Planning, {
  foreignKey: 'infermier_id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});

module.exports = Infermier;
