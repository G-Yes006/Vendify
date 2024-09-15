import { Request, Response } from 'express';
import userService from '../services/userService';
import { handleError } from '../utils/errorHandler';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.createUser(name, email, password);
    res.status(201).json(user);
  } catch (err) {
    handleError(res, err);
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userDetails = await userService.getUserDetails(parseInt(userId));
    res.json(userDetails);
  } catch (err) {
    handleError(res, err);
  }
};

export const addUserAddress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { type, addressData } = req.body;
    const address = await userService.addUserAddress(
      parseInt(userId),
      type,
      addressData
    );
    res.status(201).json(address);
  } catch (err) {
    handleError(res, err);
  }
};

export const logUserActivity = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { action } = req.body;
    const log = await userService.logUserActivity(parseInt(userId), action);
    res.status(201).json(log);
  } catch (err) {
    handleError(res, err);
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;
    const updatedUser = await userService.updateUserRole(
      parseInt(userId),
      role
    );
    res.json(updatedUser);
  } catch (err) {
    handleError(res, err);
  }
};
