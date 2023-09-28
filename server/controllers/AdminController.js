const { Admin } = require("../database/models/admin");
const { Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");

module.exports = {
  createAdmin: async (req, res) => {
    try {
      const newDoctor = await Admin.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error creating user", error: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const email = req.body.email;
      const admin = await Admin.findOne({ where: { email } });
      const token = jwt.sign(admin.dataValues, "user", { expiresIn: "1h" });
      console.log(token);
      res.status(200).json(token);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error fetching user", error: err.message });
    }
  },
};
