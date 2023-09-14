const asyncHandler = require("express-async-handler");

const Train = require("../models/trainModel");
const generateRandomTrainCode = require("../utils/generateTrainCode");

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

module.exports = { createTrain, getAvailability };
