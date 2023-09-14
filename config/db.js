const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected...");
  } catch (error) {
    console.log(error.message);
    //Exit proceess with failure
    process.exit(1);
  }
};

module.exports = connectDB;
