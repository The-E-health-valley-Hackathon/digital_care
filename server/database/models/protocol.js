const { DataTypes } = require('sequelize');
const sequelize = require("../configdb");

const Protocol = sequelize.define('protocol', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nameProtocol: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  medicament: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  mediament: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  posoloie: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  nbrDeJour: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  qteTotal: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  cu: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  ct: {
    type: DataTypes.STRING(45),
  },
});

module.exports = Protocol;
