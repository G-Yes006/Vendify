import { Router } from 'express';
import {
  getCategories,
  createCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validate';
import { createCategorySchema } from '../validations/categoryValidation';

const router = Router();

router.get('/', getCategories);
router.post(
  '/',
  authMiddleware,
  validate(createCategorySchema),
  createCategory
);
router.delete('/:categoryId', authMiddleware, deleteCategory);

export default router;
