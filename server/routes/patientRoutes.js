const express = require("express");
const router = express.Router();

const {
    AddPatient
  } = require("../controllers/patientController");

  router.post("/addPatient", AddPatient)




module.exports = router;