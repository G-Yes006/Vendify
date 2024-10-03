import prisma from '../config/db';
import { Category } from '@prisma/client';

class CategoryRepository {
  async findAll(): Promise<Category[]> {
    return await prisma.category.findMany();
  }

  async createCategory(name: string): Promise<Category> {
    return await prisma.category.create({ data: { name } });
  }

  async deleteCategory(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } });
  }
}

export default new CategoryRepository();
