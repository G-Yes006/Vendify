import { Request, Response } from 'express';
import cartService from '../services/cartService';
import { handleError } from '../utils/errorHandler';

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const cart = await cartService.getCartByUserId(userId);
    res.json(cart);
  } catch (err) {
    handleError(res, err);
  }
};

export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { productId, quantity } = req.body;
    const item = await cartService.addItemToCart(userId, productId, quantity);
    res.status(201).json(item);
  } catch (err) {
    handleError(res, err);
  }
};

export const removeItemFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { productId } = req.params;
    await cartService.removeItemFromCart(userId, Number(productId));
    res.status(204).end();
  } catch (err) {
    handleError(res, err);
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    await cartService.clearCart(userId);
    res.status(204).end();
  } catch (err) {
    handleError(res, err);
  }
};
