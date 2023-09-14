const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");
const { registerUser, authUser } = require("../controllers/userController");

router.route("/signup").post(registerUser);
router.post("/login", authUser);

module.exports = router;
