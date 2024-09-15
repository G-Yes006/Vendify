import { AuthRepository } from '../repositories/authRepository';
import { hashPassword, comparePassword } from '../utils/bcryptUtils';
import { generateToken } from '../utils/jwtUtils';
import { User } from '@prisma/client';

export class AuthService {
  static async signup(
    email: string,
    password: string,
    name: string
  ): Promise<User> {
    const existingUser = await AuthRepository.findUserByEmail(email);

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await hashPassword(password);
    return AuthRepository.createUser(email, hashedPassword, name);
  }

  static async login(email: string, password: string): Promise<string> {
    const user = await AuthRepository.findUserByEmail(email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    return generateToken({ userId: user.id, role: user.role });
  }

  static async getProfile(userId: string | undefined) {
    if (!userId) {
      throw new Error('User ID not found');
    }

    return AuthRepository.findUserById(userId);
  }
}
