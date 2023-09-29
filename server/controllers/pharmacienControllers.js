const { Pharmacien } = require("../database/models/pharmacien");
const { Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  createPharmacien: async (req, res) => {
    try {
      const {
        mot_de_passe,
        prenom,
        nom,
        sexe,
        email,
        image,
        date_de_naissance,
        numeroDeTelphone,
        role,
      } = req.body;

      const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
      console.log(hashedPassword);
      const pharmacien = await Pharmacien.create({
        mot_de_passe: hashedPassword,
        nom,
        prenom,
        sexe,
        email,
        image,
        date_de_naissance,
        numeroDeTelphone,
        role,
      });

      res.status(201).json(pharmacien);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error creating user", error: err.message });
    }
  },
  getAllPharmacien: async (req, res) => {
    try {
      const pharmacien = await Pharmacien.findAll();
      res.status(200).json(pharmacien);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error fetching users", error: err.message });
    }
  },
  getOnePharmacien: async (req, res) => {
    try {
      const { email, mot_de_passe } = req.body;
      const pharmacien = await Pharmacien.findOne({ where: { email } });

      if (!pharmacien) {
        res.status(404).json({ message: "Admin not found" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        mot_de_passe,
        pharmacien.mot_de_passe
      );
      if (!passwordMatch) {
        res.status(401).json({ message: "Incorrect password" });
        return;
      }

      const token = jwt.sign(
        {
          prenom: pharmacien.prenom,
          nom: pharmacien.nom,
          role: pharmacien.role,
          image: doctor.image,
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
  },
};
