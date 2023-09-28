const { DataTypes } = require('sequelize');
const sequelize = require("../configdb");
const FicheFabrication = require('./fiche_fabrication');

const Types = sequelize.define('types', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  typeSolvant: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  conditionnement: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  dispositifMedicaux: {
    type: DataTypes.STRING(155),
    allowNull: false,
  },
});

Types.belongsTo(FicheFabrication, {
  foreignKey: 'fiche_produit_id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});

module.exports = Types;
