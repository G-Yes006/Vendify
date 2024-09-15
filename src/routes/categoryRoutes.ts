import { Router } from 'express';
import {
  getCategories,
  createCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getCategories);
router.post('/', authMiddleware, createCategory);
router.delete('/:categoryId', authMiddleware, deleteCategory);

export default router;
