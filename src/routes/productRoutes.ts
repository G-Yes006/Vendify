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
import {
  createProductSchema,
  updateProductSchema,
} from '../validations/productValidation';

const router = Router();

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.post('/', validate(createProductSchema), authMiddleware, createProduct);
router.put(
  '/:productId',
  validate(updateProductSchema),
  authMiddleware,
  updateProduct
);
router.delete('/:productId', authMiddleware, deleteProduct);

export default router;
