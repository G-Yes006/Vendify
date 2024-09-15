import { Router } from 'express';
import {
  createUser,
  getUserDetails,
  addUserAddress,
  logUserActivity,
  updateUserRole,
} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', createUser);
router.get('/:userId', authMiddleware, getUserDetails);
router.post('/:userId/address', authMiddleware, addUserAddress);
router.post('/:userId/activity', authMiddleware, logUserActivity);
router.put('/role', authMiddleware, updateUserRole);

export default router;
