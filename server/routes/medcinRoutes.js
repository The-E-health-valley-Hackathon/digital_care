const express = require("express");
const router = express.Router();
const {
  createDoctor,
  getAllDoctors,
  getOneDoctor,
} = require("../controllers/medcinController");

router.post("/addOne", createDoctor);
router.get("/getAll", getAllDoctors);
router.post("/getOne", getOneDoctor);
module.exports = router;
