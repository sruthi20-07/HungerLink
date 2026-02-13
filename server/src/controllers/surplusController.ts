import { Request, Response } from "express";
import { io } from "../index";
import Ngo from "../models/Ngo";

let surplusData: any[] = [];

// ✅ CREATE SURPLUS
export const createSurplus = async (req: Request, res: Response) => {
  try {
    const { foodType, estimatedQuantity, description, latitude, longitude } =
      req.body;

    if (!foodType || !estimatedQuantity) {
      return res.status(400).json({
        success: false,
        message: "Food type and quantity required",
      });
    }

    const newSurplus = {
      id: Date.now().toString(),
      foodType,
      estimatedQuantity,
      description: description || "",
      status: "available",
      claimedBy: null,
      createdAt: new Date(),
    };

    surplusData.unshift(newSurplus);

    io.emit("new-surplus", newSurplus);

    return res.status(201).json({
      success: true,
      data: newSurplus,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ✅ GET ALL
export const getAllSurplus = async (_req: Request, res: Response) => {
  return res.json({
    success: true,
    data: surplusData,
  });
};

// ✅ ACCEPT SURPLUS
export const acceptSurplus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ngoName } = req.body;

  const surplus = surplusData.find((item) => item.id === id);

  if (!surplus) {
    return res.status(404).json({
      success: false,
      message: "Surplus not found",
    });
  }

  if (surplus.status === "claimed") {
    return res.status(400).json({
      success: false,
      message: "Already claimed",
    });
  }

  surplus.status = "claimed";
  surplus.claimedBy = ngoName;

  io.emit("surplus-claimed", surplus);

  return res.json({
    success: true,
    data: surplus,
  });
};
