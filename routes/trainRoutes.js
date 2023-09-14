const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");
const {
  createTrain,
  getAvailability,
  bookTrain,
} = require("../controllers/trainController");

router.route("/create").post(protect, admin, createTrain);
router.route("/availability").get(protect, getAvailability);
router.route("/:train_number/book").post(protect, bookTrain);

module.exports = router;
