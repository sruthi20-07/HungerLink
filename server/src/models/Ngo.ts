import mongoose, { Schema, Document } from "mongoose";

export interface INgo extends Document {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  location: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  createdAt: Date;
  updatedAt: Date;
}

const NgoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

// 🔥 Important for geospatial search
NgoSchema.index({ location: "2dsphere" });

export default mongoose.model<INgo>("Ngo", NgoSchema);
