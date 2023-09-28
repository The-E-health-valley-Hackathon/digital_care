const { Pharmacien } = require("../database/models/pharmacien");
const { Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");

module.exports = {
  createPharmacien: async (req, res) => {
    try {
      const pharmacien = await Pharmacien.create(req.body);
      res.status(201).json(pharmacien);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error creating user", error: err.message });
    }
  },
  getAllPharmacien: async (req, res) => {
    try {
      const Infermier = await Infermier.findAll();
      res.status(200).json(Infermier);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error fetching users", error: err.message });
    }
  },
  getOnePharmacien: async (req, res) => {
    try {
      const email = req.body.email;
      const Infermier = await Infermier.findOne({ where: { email } });
      const token = jwt.sign(Infermier.dataValues, "user", { expiresIn: "1h" });
      console.log(token);
      res.status(200).json(token);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error fetching user", error: err.message });
    }
  },
};
