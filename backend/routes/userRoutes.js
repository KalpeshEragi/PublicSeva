import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/users/me
 * @desc    Get logged-in user info
 * @access  Protected
 */
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

export default router;
