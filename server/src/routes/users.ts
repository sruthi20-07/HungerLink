import express from "express";
import { updateProfile, getNearbyUsers, getUserStats } from "../controllers/userController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

// All user routes require authentication
router.use(authenticate);

// Update user profile
router.put("/profile", updateProfile);

// Get user statistics
router.get("/stats", getUserStats);

// Get nearby users
router.get("/nearby", getNearbyUsers);

export default router;
