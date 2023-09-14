const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");
const { createTrain } = require("../controllers/trainController");

router.route("/create").post(protect, admin, createTrain);

module.exports = router;
