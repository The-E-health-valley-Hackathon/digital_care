const { Patient } = require("../database/models/patient")

// Define the AddPatient function
const AddPatient = async (req, res) => {
  try {
    // Extract patient data from the request body
    const {
      nom,
      prenom,
      gender,
      age,
      poids,
      taille,
      corporelle,
      imc,
      plasmatique,
      clairance,
      dateAdmission,
      dateprotocole,
      typegreffe,
    } = req.body;

    // Create a new patient record in the database
    const newPatient = await Patient.create({
      nom,
      prenom,
      gender,
      age,
      poids,
      taille,
      corporelle,
      imc,
      plasmatique,
      clairance,
      dateAdmission,
      dateprotocole,
      typegreffe,
    });

    // Respond with the newly created patient record
    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Error adding patient:', error);
    res.status(500).json({ error: 'Failed to add patient' });
  }
};

module.exports = { AddPatient };
