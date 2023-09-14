const mongoose = require("mongoose");

const trainSchema = mongoose.Schema(
  {
    train_name: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    seat_capacity: {
      type: Number,
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
  },
  {
    timestamps: true,
  }
);

const Train = mongoose.model("Train", trainSchema);

module.exports = Train;
