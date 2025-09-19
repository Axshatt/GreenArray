// backend/routes/cart.js
import express from "express";
import Cart from "../models/Cart.js"; // mongoose cart model
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Get cart item count
router.get("/count", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json({ itemCount: cart ? cart.items.length : 0 });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
