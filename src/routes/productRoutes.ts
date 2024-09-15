import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.post('/', authMiddleware, createProduct);
router.put('/:productId', authMiddleware, updateProduct);
router.delete('/:productId', authMiddleware, deleteProduct);

export default router;
