import userRepository from '../repositories/userRepository';
import { comparePassword, hashPassword } from '../utils/bcryptUtils';

class UserService {
  async createUser(name: string, email: string, password: string) {
    // Encrypt password (use bcrypt or similar)
    const hashedPassword = await hashPassword(password);
    return await userRepository.createUser(name, email, hashedPassword);
  }

  async getUserDetails(userId: string) {
    return await userRepository.getUserById(userId);
  }

  async getUserById(userId: string) {
    return await userRepository.getUserByIdWithPassWord(userId);
  }

  async addUserAddress(userId: string, type: string, addressData: any) {
    return await userRepository.addUserAddress(userId, type, addressData);
  }

  async logUserActivity(userId: string, action: string) {
    return await userRepository.logUserActivity(userId, action);
  }

  async updateUserRole(userId: string, role: string) {
    return await userRepository.updateUserRole(userId, role);
  }

  async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    const userData = await userRepository.getUserByIdWithPassWord(userId);
    const isMatch = await comparePassword(currentPassword, userData.password);
    if (!isMatch) {
      return false;
    }
    const hashedPassword = await hashPassword(newPassword);
    await userRepository.updatePassword(userId, hashedPassword);
    return true;
  }
}

export default new UserService();
