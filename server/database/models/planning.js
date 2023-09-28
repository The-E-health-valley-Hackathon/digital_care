const { DataTypes } = require('sequelize');
const sequelize = require("../configdb");
const Infermier = require('./infermier');

const Planning = sequelize.define('planning', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  validation: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
});

Planning.belongsTo(Infermier, {
  foreignKey: 'infermier_id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});

module.exports = Planning;
