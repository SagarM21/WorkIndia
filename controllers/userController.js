const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const User = require("../models/userModel");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      token: generateToken(user._id),
      status: "Login Successful",
    });
  } else {
    res
      .status(401)
      .json({
        status: "Incorrect username/password provided. Please retry",
        status_code: "401",
      });
    // throw new Error("Invalid email or password");
  }
});

//@desc Register a new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ msg: "User already exists" });
    // throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      status: "Account successfully created",
      //   token: generateToken(user._id),
      status_code: 200,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = { authUser, registerUser };
