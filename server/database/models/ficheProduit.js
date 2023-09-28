const { DataTypes } = require('sequelize');
const sequelize = require("../configdb");

const FicheProduit = sequelize.define('fiche_produit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomMedicament: {
    type: DataTypes.STRING(95),
    allowNull: false,
  },
  dci: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  presentation: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  laboratoire: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  prix: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  conservation: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  conditionnement: {
    type: DataTypes.STRING(95),
    allowNull: false,
  },
  solvant: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  concentration: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  dureeConservation: {
    type: DataTypes.STRING(95),
    allowNull: false,
  },
  lumiere: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  refregirateur: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  ref: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = FicheProduit;
