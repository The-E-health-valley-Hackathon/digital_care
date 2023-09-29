const { PrescriptionMedical } = require("../database/models/prescription");
const { Patient } = require("../database/models/patient"); // Make sure the import is correct

// Define the addPrescription function
const AddPrescription = async (req, res) => {
  try {
    // Extract prescription data from the request body
    const { description, protocole, dosage, patient_id } = req.body;

    // Check if the patient with the given ID exists
    const patient = await Patient.findByPk(patient_id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Create a new prescription record in the database
    const newPrescription = await PrescriptionMedical.create({
      description,
      protocole,
      dosage,
      patient_id, // Associate the prescription with the patient
    });

    // Respond with the newly created prescription record
    res.status(201).json(newPrescription);
  } catch (error) {
    console.error('Error adding prescription:', error);
    res.status(500).json({ error: 'Failed to add prescription' });
  }
};

module.exports = { AddPrescription };
