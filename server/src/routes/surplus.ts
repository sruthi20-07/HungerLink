import express from "express";
import {
  createSurplus,
  acceptSurplus,
  getAllSurplus
} from "../controllers/surplusController";

const router = express.Router();

// ---------------- CREATE SURPLUS ----------------
router.post("/create", createSurplus);

// ---------------- ACCEPT SURPLUS ----------------
router.post("/accept/:id", acceptSurplus);

// ---------------- GET ALL SURPLUS ----------------
router.get("/", getAllSurplus);

export default router;
