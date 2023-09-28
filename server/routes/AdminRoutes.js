const express = require("express");
const router = express.Router();
const { login, createAdmin } = require("../controllers/AdminController");

router.post("/addAdmin", createAdmin);
router.post("/login", login);

module.exports = router;
