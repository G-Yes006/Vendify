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

  async getUserById(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        password: false, // Explicitly exclude `password`
        // Related models
        addresses: true,
        orders: true,
        activityLogs: true,
      },
    });
  }

  async getUserByIdWithPassWord(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        password: true,
      },
    });
  }

  async addUserAddress(userId: string, type: string, addressData: any) {
    return await prisma.address.create({
      data: {
        userId,
        type,
        ...addressData,
      },
    });
  }

  async logUserActivity(userId: string, action: string) {
    return await prisma.activityLog.create({
      data: {
        userId,
        action,
      },
    });
  }

  async updateUserRole(userId: string, role: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  }

  async updateUserProfile(
    userId: string,
    profileData: { name?: string; email?: string }
  ) {
    return await prisma.user.update({
      where: { id: userId },
      data: profileData,
    });
  }

  async updatePassword(userId: string, newPassword: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        password: newPassword, // Assumes the password is already hashed before updating
      },
    });
  }

  async updateAddress(addressId: string, newAddressData: any) {
    return await prisma.address.update({
      where: { id: addressId },
      data: newAddressData,
    });
  }
}

export default new UserRepository();
