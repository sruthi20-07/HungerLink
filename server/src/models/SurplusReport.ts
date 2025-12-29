import mongoose, { Document, Schema } from "mongoose";
import { SurplusStatus } from "../types";

export interface ISurplusReport extends Document {
  providerId: mongoose.Types.ObjectId;
  foodType: string;
  estimatedQuantity: string;
  pickupLocation: {
    type: "Point";
    coordinates: number[];
  };
  pickupAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  availableUntil: Date;
  status: SurplusStatus;
  claimedBy?: mongoose.Types.ObjectId;
}

const SurplusReportSchema = new Schema<ISurplusReport>(
  {
    providerId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    foodType: { type: String, required: true },
    estimatedQuantity: { type: String, required: true },

    pickupLocation: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },

    pickupAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, default: "India" }
    },

    availableUntil: { type: Date, required: true },

    status: {
      type: String,
      enum: Object.values(SurplusStatus),
      default: SurplusStatus.AVAILABLE
    },

    claimedBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export const SurplusReport = mongoose.model<ISurplusReport>(
  "SurplusReport",
  SurplusReportSchema
);
