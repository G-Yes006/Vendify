import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  static async signup(req: Request, res: Response) {
    const { email, password, name } = req.body;

    try {
      const user = await AuthService.signup(email, password, name);
      return res
        .status(201)
        .json({ message: 'User created successfully', user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const data = await AuthService.login(email, password);
      return res.status(200).json({ message: 'Login successful', data });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
