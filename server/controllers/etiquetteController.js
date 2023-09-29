const { Etiquette } = require("../database/models/etiquette");

// Create a new Etiquette
module.exports = {
  createEtiquette: async (req, res) => {
    try {
      const {
        nomMedicament,
        service,
        dateFabrication,
        dateAdministration,
        conservation,
      } = req.body;

      const newEtiquette = await Etiquette.create({
        nomMedicament,
        service,
        dateFabrication,
        dateAdministration,
        conservation,
      });

      res.status(201).json(newEtiquette);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating Etiquette" });
    }
  },
  
  // Get all Etiquettes
  getAllEtiquettes: async (req, res) => {
    try {
      const etiquettes = await Etiquette.findAll();
      res.status(200).json(etiquettes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching Etiquettes" });
    }
  },

  // Delete Etiquettes (Provide a condition to delete)
  deleteEtiquettes: async (req, res) => {
    try {
      // Your delete logic here

      res.status(200).json({ message: "Etiquettes deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting Etiquettes" });
    }
  },

  // Find the Etiquette by ID
  getEtiquetteById: async (req, res) => {
    try {
      const { id } = req.params;

      const etiquette = await Etiquette.findByPk(id);

      if (!etiquette) {
        return res.status(404).json({ error: 'Etiquette not found' });
      }

      res.status(200).json(etiquette);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching Etiquette by ID' });
    }
  },
};
