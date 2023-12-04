const express = require("express");
const router = express.Router();
const {
  createDoctor,
  getAllDoctors,
  getOneDoctor,
  getOneMedecin,
} = require("../controllers/medcinController");

router.post("/addOne", createDoctor);
router.get("/getAll", getAllDoctors);
router.post("/getOne", getOneDoctor);
router.get("/one/:id",getOneMedecin)
module.exports = router;
