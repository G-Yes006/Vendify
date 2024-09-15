import { Router } from 'express';
import {
  createPayment,
  paymentSuccess,
  paymentFailure,
  getPaymentStatus,
} from '../controllers/paymentController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/create', authMiddleware, createPayment);
router.post('/success', authMiddleware, paymentSuccess);
router.post('/failure', authMiddleware, paymentFailure);
router.get('/:paymentId/status', authMiddleware, getPaymentStatus);

export default router;
