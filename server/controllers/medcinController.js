const { Doctor } = require("../database/models/medcin");
const { Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {

  getOneMedecin: async (req, res) => {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findByPk(id);
  
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
  
      res.status(200).json(doctor);
    } catch (error) {
      console.error('Error fetching Doctor:', error);
      res.status(500).json({ error: 'Failed to fetch Doctor' });
    }
  },
  

  createDoctor: async (req, res) => {
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
    try {
      const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
      console.log(hashedPassword);
      const newDoctor = await Doctor.create({
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

      res.status(201).json(newDoctor);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error creating user", error: err.message });
    }
  },
  getAllDoctors: async (req, res) => {
    try {
      const Doctors = await Doctor.findAll();
      res.status(200).json(Doctors);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error fetching users", error: err.message });
    }
  },
  getOneDoctor: async (req, res) => {
    try {
      const { email, mot_de_passe } = req.body;
      const doctor = await Doctor.findOne({ where: { email } });

      if (!doctor) {
        res.status(404).json({ message: "Admin not found" });
        return;
      }

      if (!mot_de_passe) {
        res.status(400).json({ message: "Password is required" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        mot_de_passe, // User-entered password
        doctor.mot_de_passe // Hashed password from the database
      );

      if (!passwordMatch) {
        res.status(401).json({ message: "Incorrect password" });
        return;
      }

      const token = jwt.sign(
        {
          prenom: doctor.prenom,
          nom: doctor.nom,
          role: doctor.role,
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
