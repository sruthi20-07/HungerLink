import express from "express";
import { register, login, refreshToken, getProfile } from "../controllers/authController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

// 🔥 Remove rate limiter for hackathon demo

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);

router.get("/profile", authenticate, getProfile);

export default router;
