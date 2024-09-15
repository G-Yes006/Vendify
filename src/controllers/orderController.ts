import { Request, Response } from 'express';
import orderService from '../services/orderService';
import { handleError } from '../utils/errorHandler';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const orders = await orderService.getOrdersByUserId(userId);
    res.json(orders);
  } catch (err) {
    handleError(res, err);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.getOrderById(Number(orderId));
    res.json(order);
  } catch (err) {
    handleError(res, err);
  }
};
