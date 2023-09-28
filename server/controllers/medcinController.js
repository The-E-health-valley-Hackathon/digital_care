const { Doctor } = require("../database/models/medcin");
const { Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");

module.exports = {
  createDoctor: async (req, res) => {
    try {
      const newDoctor = await Doctor.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error creating user", error: err.message });
    }
  },
  getAllDoctors: async (req, res) => {
    try {
      const Doctors = await Doctor.findAll();
      res.status(200).json(users);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error fetching users", error: err.message });
    }
  },
  getOneDoctor: async (req, res) => {
    try {
      const email = req.body.email;
      const doctor = await Doctor.findOne({ where: { email } });
      const token = jwt.sign(doctor.dataValues, "user", { expiresIn: "1h" });
      console.log(token);
      res.status(200).json(token);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error fetching user", error: err.message });
    }
  },
};
