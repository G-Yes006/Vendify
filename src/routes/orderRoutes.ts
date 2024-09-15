import { Router } from 'express';
import { getOrders, getOrderById } from '../controllers/orderController';

const router = Router();

router.get('/', getOrders);
router.get('/:orderId', getOrderById);

export default router;
