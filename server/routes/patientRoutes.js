const express = require("express");
const router = express.Router();


const {
    AddPatient, DeletePatient, getAllPatients, getOnePatient, updatePatient,
  } = require("../controllers/patientController");

  router.post("/add", AddPatient)
  router.get("/all",getAllPatients)
  router.get("/one/:id",getOnePatient)
  router.put("/:id",updatePatient)

  
  

  router.delete("/delete/:id", DeletePatient)






module.exports = router;