import express from 'express';
import {
  getNotificationHistory,
  updateNotificationPreferences,
  markNotificationAsRead,
  registerFCMToken
} from '../controllers/notificationController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.get('/history', getNotificationHistory);
router.put('/preferences', updateNotificationPreferences);
router.put('/:id/read', markNotificationAsRead);
router.post('/fcm-token', registerFCMToken);

export default router;
