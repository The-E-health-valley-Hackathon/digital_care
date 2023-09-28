const { DataTypes } = require('sequelize');
const sequelize = require("../configdb");
const FicheFabrication = require('./fiche_fabrication');

const Flacon = sequelize.define('flacon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  presentation: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  nDeLot: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  datePreremption: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  qte: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Flacon.belongsTo(FicheFabrication, {
  foreignKey: 'fiche_produit_id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});

module.exports = Flacon;
