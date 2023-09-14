const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");

const getSpecificBookingDetails = asyncHandler(async (req, res) => {
  const { booking_id } = req.params;

  try {
    const bookingDetails = await Booking.findOne({ booking_id: booking_id });
    if (!bookingDetails) {
      return res.json({ message: "You have made no bookings yet" });
    }
    return res.status(200).json({
      booking_id: bookingDetails.booking_id,
      train_id: bookingDetails.train,
      train_name: bookingDetails.train_name,
      user_id: bookingDetails.user,
      no_of_seats: bookingDetails.seat_numbers.length,
      seat_numbers: bookingDetails.seat_numbers,
      arrival_time_at_source: bookingDetails.arrival_time_at_source,
      arrival_time_at_destination: bookingDetails.arrival_time_at_destination,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = getSpecificBookingDetails;
