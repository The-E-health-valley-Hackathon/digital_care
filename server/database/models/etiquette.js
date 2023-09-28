const { DataTypes } = require('sequelize');
const sequelize = require("../configdb");
const FicheFabrication = require('./fiche_fabrication');

const Etiquette = sequelize.define('etiquette', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomMedicament: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  service: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  dateFabrication: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dateAdministration: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  conservation: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

Etiquette.belongsTo(FicheFabrication, {
  foreignKey: 'fiche_produit_id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});

module.exports = Etiquette;
