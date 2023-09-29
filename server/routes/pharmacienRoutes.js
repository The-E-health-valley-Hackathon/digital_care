const express = require("express");
const router = express.Router();
const {
  createPharmacien,
  getAllPharmacien,
  getOnePharmacien,
} = require("../controllers/pharmacienControllers");

router.post("/addOne", createPharmacien);
router.get("/getAll", getAllPharmacien);
router.post("/getOne", getOnePharmacien);
module.exports = router;
