import { Router } from 'express';
import {
  createPayment,
  paymentSuccess,
  paymentFailure,
  getPaymentStatus,
} from '../controllers/paymentController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validate';
import { createPaymentSchema } from '../validations/paymentValidation';

const router = Router();

router.post(
  '/create',
  validate(createPaymentSchema),
  authMiddleware,
  createPayment
);
router.post('/success', authMiddleware, paymentSuccess);
router.post('/failure', authMiddleware, paymentFailure);
router.get('/:paymentId/status', authMiddleware, getPaymentStatus);

export default router;
