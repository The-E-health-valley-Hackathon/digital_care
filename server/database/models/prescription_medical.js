const { DataTypes } = require('sequelize');
const sequelize = require("../configdb");

const PrescriptionMedical = sequelize.define('prescription_medical', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING(555),
    allowNull: false,
  },
  protocole: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  dosage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = PrescriptionMedical;
