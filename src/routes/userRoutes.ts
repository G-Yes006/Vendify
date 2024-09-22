import { Router } from 'express';
import {
  createUser,
  getUserDetails,
  addUserAddress,
  logUserActivity,
  updateUserRole,
} from '../controllers/userController';
import { validate } from '../middlewares/validate';
import {
  createUserSchema,
  updateUserSchema,
} from '../validations/userValidation';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', validate(createUserSchema), createUser);
router.get('/:userId', authMiddleware, getUserDetails);
router.post('/:userId/address', authMiddleware, addUserAddress);
router.post('/:userId/activity', authMiddleware, logUserActivity);
router.put('/role', validate(updateUserSchema), authMiddleware, updateUserRole);

export default router;
