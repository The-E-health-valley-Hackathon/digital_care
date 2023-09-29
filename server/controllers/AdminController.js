const { Admin } = require("../database/models/admin");
const { Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  try {
    const { mot_de_passe } = req.body;
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10); // 10 is the number of salt rounds

    const newAdmin = await Admin.create({
      ...req.body,
      mot_de_passe: hashedPassword,
    });
    res.status(201).json(newAdmin);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating admin", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    const foundAdmin = await Admin.findOne({ where: { email } });

    if (!foundAdmin) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(
      mot_de_passe,
      foundAdmin.mot_de_passe
    );
    if (!passwordMatch) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign(
      {
        prenom: foundAdmin.prenom,
        nom: foundAdmin.nom,
      },
      "admin",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
};

module.exports = {
  createAdmin,
  login,
};
