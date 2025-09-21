const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {userModal} = require("../../models/User");


const authRoutes = express.Router();

// Register
authRoutes.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModal.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModal.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
authRoutes.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModal.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

  res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, is_seller: user.is_seller || false } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports={authRoutes}
