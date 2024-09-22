import { Router } from 'express';
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from '../controllers/cartController';
import { validate } from '../middlewares/validate';
import { addItemToCartSchema } from '../validations/cartValidation';

const router = Router();

router.get('/', getCart);
router.post('/add', validate(addItemToCartSchema), addItemToCart);
router.delete('/remove/:productId', removeItemFromCart);
router.delete('/clear', clearCart);

export default router;
