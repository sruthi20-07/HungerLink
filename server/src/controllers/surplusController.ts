import { Response } from "express";
import { SurplusReport } from "../models/SurplusReport";
import { AuthRequest } from "../middleware/auth";
import { SurplusStatus } from "../types";

// 🥗 Provider creates surplus
export const createSurplus = async (req: AuthRequest, res: Response) => {
  try {
    const { foodType, quantity, expiryTime, pickupLocation } = req.body;

    const report = await SurplusReport.create({
      providerId: req.user._id,
      foodType,
      estimatedQuantity: quantity,
      availableUntil: new Date(expiryTime),
      pickupLocation: {
        type: "Point",
        coordinates: [78.4867, 17.3850]
      },
      pickupAddress: {
        street: pickupLocation,
        city: "Hyderabad",
        state: "Telangana",
        zipCode: "500001",
        country: "India"
      },
      status: SurplusStatus.AVAILABLE
    });

    return res.status(201).json(report);
  } catch (err) {
    console.error("Create surplus error:", err);
    return res.status(500).json({ message: "Failed to create surplus" });
  }
};

// 🏃 Volunteer accepts surplus
export const acceptSurplus = async (req: AuthRequest, res: Response) => {
  try {
    const report = await SurplusReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Surplus not found" });

    report.status = SurplusStatus.CLAIMED;
    report.claimedBy = req.user._id;

    await report.save();
    return res.json(report);
  } catch (err) {
    console.error("Accept surplus error:", err);
    return res.status(500).json({ message: "Accept failed" });
  }
};

// 🚚 Update delivery status
export const updateStatus = async (req: AuthRequest, res: Response) => {
  try {
    const report = await SurplusReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Surplus not found" });

    report.status = req.body.status as SurplusStatus;
    await report.save();

    return res.json(report);
  } catch (err) {
    console.error("Update status error:", err);
    return res.status(500).json({ message: "Status update failed" });
  }
};

// 🛡 Admin: view all surplus
export const getAllSurplusForAdmin = async (_req: AuthRequest, res: Response) => {
  const reports = await SurplusReport.find().populate("providerId");
  return res.json(reports);
};
