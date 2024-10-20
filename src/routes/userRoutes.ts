import { Router } from 'express';
import {
  createUser,
  getUserDetails,
  addUserAddress,
  logUserActivity,
  updateUserRole,
  updateUserPassword,
} from '../controllers/userController';
import { validate } from '../middlewares/validate';
import {
  createUserSchema,
  updateUserRoleSchema,
  updatePasswordSchema,
} from '../validations/userValidation';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const router = Router();

router.post('/', validate(createUserSchema), createUser);
router.get('/info', authMiddleware, getUserDetails);
router.post('/address', authMiddleware, addUserAddress);
router.post('/activity', authMiddleware, logUserActivity);
router.put(
  '/role',
  validate(updateUserRoleSchema),
  authMiddleware,
  adminMiddleware,
  updateUserRole
);

router.put(
  '/updatePassword',
  authMiddleware,
  validate(updatePasswordSchema),
  updateUserPassword
);

export default router;
