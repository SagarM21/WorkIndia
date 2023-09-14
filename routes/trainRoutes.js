const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");
const {
  createTrain,
  getAvailability,
} = require("../controllers/trainController");

router.route("/create").post(protect, admin, createTrain);
router.route("/availability").get(protect, getAvailability);

module.exports = router;
