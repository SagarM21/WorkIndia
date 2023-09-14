const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const trainRoutes = require("./routes/trainRoutes");

dotenv.config();

// db connection
connectDB();
const app = express();

//Init Middleware
app.use(express.json({ extended: false }));

// routes
app.use("/api/users", userRoutes);
app.use("/api/train", trainRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
