const asyncHandler = require("express-async-handler");

const Train = require("../models/trainModel");

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

  const train = new Train({
    train_name,
    source,
    destination,
    seat_capacity,
    arrival_time_at_source,
    arrival_time_at_destination,
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

module.exports = { createTrain };
