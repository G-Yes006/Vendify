import { Request, Response } from 'express';
import userService from '../services/userService';
import { handleError } from '../utils/errorHandler';
import { comparePassword, hashPassword } from '../utils/bcryptUtils';

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
    const { userId } = req.user;
    const userDetails = await userService.getUserDetails(userId);
    res.json(userDetails);
  } catch (err) {
    handleError(res, err);
  }
};

export const addUserAddress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;
    const { type, addressData } = req.body;
    const address = await userService.addUserAddress(userId, type, addressData);
    res.status(201).json(address);
  } catch (err) {
    handleError(res, err);
  }
};

export const logUserActivity = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;
    const { action } = req.body;
    const log = await userService.logUserActivity(userId, action);
    res.status(201).json(log);
  } catch (err) {
    handleError(res, err);
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;
    const updatedUser = await userService.updateUserRole(userId, role);
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: 'User not found or update failed' });
    }
    const { password, ...userWithoutPassword } = updatedUser;
    return res.status(200).json(userWithoutPassword);
  } catch (err) {
    handleError(res, err);
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;
    const { currentPassword, newPassword } = req.body;

    // Get the user's current password from the database
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare current password
    const isPasswordValid = await comparePassword(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Check if the new password is the same as the current one
    const isSamePassword = await comparePassword(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        message: 'New password cannot be the same as the current password',
      });
    }

    // If valid, update the password
    await userService.updatePassword(userId, newPassword);

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    handleError(res, err);
  }
};
