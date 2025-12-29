import express from "express";
import { register, login, refreshToken, getProfile } from "../controllers/authController";
import { authenticate } from "../middleware/auth";
import { authLimiter } from "../middleware/rateLimiter";

const router = express.Router();

router.use(authLimiter);

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.get("/profile", authenticate, getProfile);

export default router;
