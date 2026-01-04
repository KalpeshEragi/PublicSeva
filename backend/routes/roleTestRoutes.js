import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/test/citizen
 * @access  Citizen only
 */
router.get(
  "/citizen",
  authMiddleware,
  roleMiddleware("citizen"),
  (req, res) => {
    res.json({
      success: true,
      message: "Citizen access granted",
      user: req.user
    });
  }
);

/**
 * @route   GET /api/test/admin
 * @access  Admin only
 */
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin access granted",
      user: req.user
    });
  }
);

/**
 * @route   GET /api/test/coordinator
 * @access  Coordinator only
 */
router.get(
  "/coordinator",
  authMiddleware,
  roleMiddleware("coordinator"),
  (req, res) => {
    res.json({
      success: true,
      message: "Coordinator access granted",
      user: req.user
    });
  }
);

export default router;
