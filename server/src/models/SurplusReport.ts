import mongoose, { Schema } from "mongoose";
import { SurplusStatus } from "../types.js";

const SurplusReportSchema = new Schema(
  {
    providerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    claimedBy: { type: Schema.Types.ObjectId, ref: "User" },
    foodType: String,
    estimatedQuantity: Number,
    availableUntil: Date,
    pickupLocation: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }
    },
    pickupAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    status: { type: String, enum: Object.values(SurplusStatus), default: SurplusStatus.AVAILABLE }
  },
  { timestamps: true }
);

export const SurplusReport = mongoose.model("SurplusReport", SurplusReportSchema);
