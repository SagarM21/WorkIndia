const express = require("express");
const getSpecificBookingDetails = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/:booking_id").get(protect, getSpecificBookingDetails);

module.exports = router;
