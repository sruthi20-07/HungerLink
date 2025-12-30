import express from "express";
import { register, login, refreshToken, getProfile } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.use(authLimiter);

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.get("/profile", authenticate, getProfile);

export default router;
