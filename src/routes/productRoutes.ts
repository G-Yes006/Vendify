import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validate';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import {
  createProductSchema,
  updateProductSchema,
} from '../validations/productValidation';

const router = Router();

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.post('/', validate(createProductSchema), authMiddleware, adminMiddleware, createProduct);
router.put(
  '/:productId',
  validate(updateProductSchema),
  authMiddleware, adminMiddleware,
  updateProduct
);
router.delete('/:productId', authMiddleware, adminMiddleware, deleteProduct);

export default router;
