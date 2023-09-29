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
      doctors_id
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
      doctors_id
    });

    // Respond with the newly created patient record
    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Error adding patient:', error);
    res.status(500).json({ error: 'Failed to add patient' });
  }
};

const DeletePatient = async (req, res) => {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id);
  
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      await patient.destroy();
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting patient:', error);
      res.status(500).json({ error: 'Failed to delete patient' });
    }
  };
  const getAllPatients = async (req, res) => {
    try {
      const patients = await Patient.findAll();
      res.status(200).json(patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ error: 'Failed to fetch patients' });
    }
  };
  const getOnePatient = async (req, res) => {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id);
  
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      res.status(200).json(patient);
    } catch (error) {
      console.error('Error fetching patient:', error);
      res.status(500).json({ error: 'Failed to fetch patient' });
    }
  };
  const updatePatient = async (req, res) => {
    try {
      const { id } = req.params;
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
        doctors_id,
      } = req.body;
  
      const patient = await Patient.findByPk(id);
  
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      patient.nom = nom;
      patient.prenom = prenom;
      patient.gender = gender;
      patient.age = age;
      patient.poids = poids;
      patient.taille = taille;
      patient.corporelle = corporelle;
      patient.imc = imc;
      patient.plasmatique = plasmatique;
      patient.clairance = clairance;
      patient.dateAdmission = dateAdmission;
      patient.dateprotocole = dateprotocole;
      patient.typegreffe = typegreffe;
      patient.doctors_id = doctors_id;
  
      await patient.save();
  
      res.status(200).json(patient);
    } catch (error) {
      console.error('Error updating patient:', error);
      res.status(500).json({ error: 'Failed to update patient' });
    }
  };

module.exports = { AddPatient ,DeletePatient, getAllPatients, getOnePatient , updatePatient};
