import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} from '../controllers/orderController';
import { validate } from '../middlewares/validate';
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from '../validations/orderValidation';

const router = Router();

router.post('/', validate(createOrderSchema), authMiddleware, createOrder);
router.put(
  '/status',
  validate(updateOrderStatusSchema),
  authMiddleware,
  updateOrderStatus
);
router.get('/', getOrders);
router.get('/:orderId', getOrderById);

export default router;
