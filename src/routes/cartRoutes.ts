import { Router } from 'express';
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from '../controllers/cartController';

const router = Router();

router.get('/', getCart);
router.post('/add', addItemToCart);
router.delete('/remove/:productId', removeItemFromCart);
router.delete('/clear', clearCart);

export default router;
