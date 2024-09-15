import { Request, Response } from 'express';
import paymentService from '../services/paymentService';
import { handleError } from '../utils/errorHandler';

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { orderId, amount } = req.body;
    const clientSecret = await paymentService.createPaymentIntent(
      orderId,
      amount
    );
    res.json({ clientSecret });
  } catch (err) {
    handleError(res, err);
  }
};

export const paymentSuccess = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.body;
    await paymentService.handlePaymentSuccess(paymentId);
    res.json({ message: 'Payment completed successfully' });
  } catch (err) {
    handleError(res, err);
  }
};

export const paymentFailure = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.body;
    await paymentService.handlePaymentFailure(paymentId);
    res.json({ message: 'Payment failed' });
  } catch (err) {
    handleError(res, err);
  }
};

export const getPaymentStatus = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;
    const status = await paymentService.getPaymentStatus(paymentId);
    res.json(status);
  } catch (err) {
    handleError(res, err);
  }
};
