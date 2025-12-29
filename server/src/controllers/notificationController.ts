import { Response, NextFunction } from 'express';
import Joi from 'joi';
import { User } from '../models/User';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const updatePreferencesSchema = Joi.object({
  email: Joi.boolean().optional(),
  push: Joi.boolean().optional(),
  sms: Joi.boolean().optional()
});

const fcmTokenSchema = Joi.object({
  token: Joi.string().required(),
  deviceId: Joi.string().optional()
});

export const getNotificationHistory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.json({ success: true, message: 'Notification history retrieved successfully', data: [] });
  } catch (error) {
    next(error);
  }
};

export const updateNotificationPreferences = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value } = updatePreferencesSchema.validate(req.body);
    if (error) throw createError(error.details[0].message, 400);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { notificationPreferences: value } },
      { new: true }
    );

    res.json({ success: true, data: updatedUser?.notificationPreferences });
  } catch (error) {
    next(error);
  }
};

export const markNotificationAsRead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res.json({ success: true, message: 'Notification marked as read', data: { id: req.params.id } });
};

export const registerFCMToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value } = fcmTokenSchema.validate(req.body);
    if (error) throw createError(error.details[0].message, 400);

    await User.findByIdAndUpdate(req.user._id, { $addToSet: { fcmTokens: value.token } });

    res.json({ success: true, message: 'FCM token registered successfully' });
  } catch (error) {
    next(error);
  }
};
