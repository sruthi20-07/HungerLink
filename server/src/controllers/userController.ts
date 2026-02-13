import { Response, NextFunction } from "express";
import Joi from "joi";
import { User } from "../models/User";
import { createError } from "../middleware/errorHandler";
import { AuthRequest } from "../middleware/auth";
import { UserRole } from "../types.js";

const updateProfileSchema = Joi.object({
  organizationName: Joi.string().optional(),
  contactPhone: Joi.string().optional(),
  location: Joi.object({
    coordinates: Joi.array().items(Joi.number()).length(2).required()
  }).optional()
});

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { error, value } = updateProfileSchema.validate(req.body);
    if (error) throw createError(error.details[0].message, 400);

    const user = await User.findByIdAndUpdate(req.user._id, value, { new: true });
    if (!user) throw createError("User not found", 404);

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const getNearbyUsers = async (_req: AuthRequest, res: Response) => {
  res.json({ success: true, data: [] });
};

export const getUserStats = async (req: AuthRequest, res: Response) => {
  const stats = { joined: req.user.createdAt, reliability: req.user.reliabilityScore };
  res.json({ success: true, data: stats });
};
