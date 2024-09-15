import userRepository from '../repositories/userRepository';

class UserService {
  async createUser(name: string, email: string, password: string) {
    // Encrypt password (use bcrypt or similar)
    const hashedPassword = await this.hashPassword(password);
    return await userRepository.createUser(name, email, hashedPassword);
  }

  async getUserDetails(userId: number) {
    return await userRepository.getUserById(userId);
  }

  async addUserAddress(userId: number, type: string, addressData: any) {
    return await userRepository.addUserAddress(userId, type, addressData);
  }

  async logUserActivity(userId: number, action: string) {
    return await userRepository.logUserActivity(userId, action);
  }

  async updateUserRole(userId: number, role: string) {
    return await userRepository.updateUserRole(userId, role);
  }

  private async hashPassword(password: string): Promise<string> {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}

export default new UserService();
