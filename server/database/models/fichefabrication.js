const { DataTypes } = require('sequelize');
const sequelize = require("../configdb");
//const Protocol = require('./protocol');
//const FicheProduit = require('./fiche_produit');
const Etiquette = require('./etiquette');
const FicheFabrication = sequelize.define('fichefabrication', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  medicament: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  nomPatient: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  service: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  sc: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dose: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  protocole: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  doseFinal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dateFabrication: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nOrdennacier: {
    type: DataTypes.INTEGER,
  },
  manipulateur: {
    type: DataTypes.STRING(45),
  },
  preleve1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preleve2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inject: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  volume: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  concentration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  conditionnement: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  stabilite: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  nomEditer: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  nomVerifier: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});
/*
FicheFabrication.belongsTo(Protocol, {
  foreignKey: 'protocol_id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});*/
/*
FicheFabrication.belongsTo(FicheProduit, {
  foreignKey: 'fiche_produit_id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});*/


module.exports = {FicheFabrication};
