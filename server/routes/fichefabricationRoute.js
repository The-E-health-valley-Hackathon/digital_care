const express = require('express');
const router = express.Router();
const { createFicheFab,getAllFicheFabrications } = require('../controllers/FicheFabricationController'); 

// Route to create a new FicheFabrication 
router.post('/', createFicheFab);
router.get('/get', getAllFicheFabrications);

module.exports = router;
