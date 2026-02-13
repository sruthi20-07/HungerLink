import express from "express";
import {
  getNotificationHistory,
  updateNotificationPreferences,
  markNotificationAsRead,
  registerFCMToken
} from "../controllers/notificationController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

// All notification routes require authentication
router.use(authenticate);

// Get user notification history
router.get("/history", getNotificationHistory);

// Update notification preferences
router.put("/preferences", updateNotificationPreferences);

// Mark a notification as read
router.put("/:id/read", markNotificationAsRead);

// Register FCM token (if using push notifications)
router.post("/fcm-token", registerFCMToken);

export default router;
