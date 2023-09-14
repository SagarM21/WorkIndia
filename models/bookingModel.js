const mongoose = require("mongoose");
const Train = require("./trainModel");
const User = require("./userModel");

const bookingSchema = new mongoose.Schema(
  {
    train: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Train, // Reference to the Train model
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User, // Reference to the User model
      required: true,
    },
    booking_id: {
      type: String,
      required: true,
      unique: true,
    },
    seat_numbers: {
      type: [Number], // Array to store seat numbers
      required: true,
    },
    arrival_time_at_source: {
      type: String,
      required: true,
    },
    arrival_time_at_destination: {
      type: String,
      required: true,
    },
    train_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
