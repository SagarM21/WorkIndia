const asyncHandler = require("express-async-handler");

const Train = require("../models/trainModel");
const generateRandomTrainCode = require("../utils/generateTrainCode");
const generateBookingID = require("../utils/generateBookingId");
const shuffleSeats = require("../utils/shuffleSeats");
const Booking = require("../models/bookingModel");

// DESC: Private/admin
// /api/train/create
const createTrain = asyncHandler(async (req, res) => {
  const {
    train_name,
    source,
    destination,
    seat_capacity,
    arrival_time_at_source,
    arrival_time_at_destination,
  } = req.body;

  let trainCode;
  let existingTrain;

  do {
    trainCode = generateRandomTrainCode();
    const existingTrain = await Train.findOne({ train_code: trainCode });
  } while (existingTrain);

  const train = new Train({
    train_name,
    source,
    destination,
    seat_capacity,
    arrival_time_at_source,
    arrival_time_at_destination,
    train_number: trainCode,
  });
  try {
    await train.save();
    return res
      .status(200)
      .json({ message: "Train added successfully", train_id: train._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const getAvailability = asyncHandler(async (req, res) => {
  try {
    const { source, destination } = req.query;

    const trains = await Train.find({ source, destination });

    const availability = trains.map((train) => ({
      train_id: train._id,
      train_name: train.train_name,
      available_seats: train.seat_capacity,
      train_number: train.train_number,
    }));

    res.json(availability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const bookTrain = asyncHandler(async (req, res) => {
  try {
    const { train_number } = req.params;
    const { user_id, no_of_seats } = req.body;

    const train = await Train.findById({ _id: train_number });
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    if (train.seat_capacity < no_of_seats) {
      return res.status(400).json({ message: "Not enough available seats" });
    }

    const allSeatNumbers = Array.from(
      { length: train.seat_capacity },
      (_, i) => i + 1
    );

    shuffleSeats(allSeatNumbers);

    const bookedSeatNumbers = [];
    while (bookedSeatNumbers.length < no_of_seats) {
      const nextSeatNumber = allSeatNumbers.pop();

      // Check if this seat number is already booked
      const isAlreadyBooked = await Booking.findOne({
        train: train._id,
        seat_numbers: nextSeatNumber,
      });

      if (!isAlreadyBooked) {
        bookedSeatNumbers.push(nextSeatNumber);
      }
    }
    const booking_id = generateBookingID();

    const booking = new Booking({
      train: train._id,
      user: user_id,
      booking_id,
      seat_numbers: bookedSeatNumbers,
    });

    train.seat_capacity -= no_of_seats;

    await booking.save();
    await train.save();

    return res.status(200).json({
      message: "Seat booked successfully",
      booking_id,
      seat_numbers: bookedSeatNumbers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { createTrain, getAvailability, bookTrain };
