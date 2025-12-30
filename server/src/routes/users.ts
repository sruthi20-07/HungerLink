import express from "express";
import { updateProfile, getNearbyUsers, getUserStats } from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticate);

router.put("/profile", updateProfile);
router.get("/stats", getUserStats);
router.get("/nearby", getNearbyUsers);

export default router;
