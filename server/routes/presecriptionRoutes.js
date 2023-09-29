const express = require("express");
const router = express.Router();
const { AddPrescription } = require("../controllers/presecriptionController");



router.post('/add', AddPrescription);





module.exports = router;