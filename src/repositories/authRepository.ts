import { PrismaClient, User } from '@prisma/client';
import prisma from '../config/db';

export class AuthRepository {
  static async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  static async createUser(
    email: string,
    password: string,
    name: string
  ): Promise<User> {
    return prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  }

  static async findUserById(userId: number): Promise<User | null> {
    // Make sure `userId` type matches the schema
    return prisma.user.findUnique({ where: { id: userId } });
  }
}
