import { Request, Response } from 'express';
import orderService from '../services/orderService';
import { handleError } from '../utils/errorHandler';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.user!.userId, req.body);
    res.status(201).json(order);
  } catch (err) {
    handleError(res, err);
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    const updatedOrder = await orderService.updateOrderStatus(orderId, status);
    res.json(updatedOrder);
  } catch (err) {
    handleError(res, err);
  }
};

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
    const order = await orderService.getOrderById(orderId);
    res.json(order);
  } catch (err) {
    handleError(res, err);
  }
};
