const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

// ✅ Register user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  return registerUser(req, res);
});

// ✅ Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email & Password required" });
  }

  return loginUser(req, res);
});

// ✅ Get logged-in user (protected route)
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;