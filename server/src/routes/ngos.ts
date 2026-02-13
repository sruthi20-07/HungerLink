import express from "express";
import {
  createNgo,
  getAllNgos,
  getNearbyNgos,
} from "../controllers/ngoController";

const router = express.Router();

router.post("/", createNgo);
router.get("/", getAllNgos);
router.get("/nearby", getNearbyNgos);

export default router;
