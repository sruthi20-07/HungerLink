import express from "express";
import {
  createSurplus,
  acceptSurplus,
  updateStatus,
  getAllSurplusForAdmin
} from "../controllers/surplusController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.use(authenticate);

// Provider creates surplus
router.post("/create", createSurplus);

// Volunteer accepts surplus
router.post("/accept/:id", acceptSurplus);

// Update status
router.put("/status/:id", updateStatus);

// Admin view all surplus
router.get("/admin/all", getAllSurplusForAdmin);

export default router;
