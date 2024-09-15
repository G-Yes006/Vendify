import prisma from '../config/db';

class UserRepository {
  async createUser(name: string, email: string, password: string) {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async getUserById(userId: number) {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
        orders: true,
        activityLogs: true,
      },
    });
  }

  async addUserAddress(userId: number, type: string, addressData: any) {
    return await prisma.address.create({
      data: {
        userId,
        type,
        ...addressData,
      },
    });
  }

  async logUserActivity(userId: number, action: string) {
    return await prisma.activityLog.create({
      data: {
        userId,
        action,
      },
    });
  }

  async updateUserRole(userId: number, role: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  }
}

export default new UserRepository();
