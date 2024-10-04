import { Router } from 'express';
import {
  getCategories,
  createCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import { validate } from '../middlewares/validate';
import { createCategorySchema } from '../validations/categoryValidation';

const router = Router();

router.get('/', getCategories);
router.post(
  '/',
  authMiddleware, adminMiddleware,
  validate(createCategorySchema),
  createCategory
);
router.delete('/:categoryId', authMiddleware, adminMiddleware, deleteCategory);

export default router;
