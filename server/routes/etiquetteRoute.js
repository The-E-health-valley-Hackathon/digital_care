const express = require('express');
const router = express.Router();
const {getAllEtiquettes,createEtiquette, deleteEtiquettes,getEtiquetteById} = require('../controllers/etiquetteController');

// Get all Etiquettes
router.get('/get', getAllEtiquettes);
// get by id
router.get('/get/:id',getEtiquetteById)
// create Etiquettes
router.post('/',createEtiquette)
// delete Etiquettes
router.delete('/delete',deleteEtiquettes)

module.exports = router;
