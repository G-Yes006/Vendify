import categoryRepository from '../repositories/categoryRepository';
import { Category } from '@prisma/client';

class CategoryService {
  async getAllCategories(): Promise<Category[]> {
    return await categoryRepository.findAll();
  }

  async createCategory(name: string): Promise<Category> {
    return await categoryRepository.createCategory(name);
  }

  async deleteCategory(id: number): Promise<void> {
    return await categoryRepository.deleteCategory(id);
  }
}

export default new CategoryService();
