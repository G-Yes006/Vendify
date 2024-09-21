import prisma from '../config/db';
import { Product, Category, Variant } from '@prisma/client';

class ProductRepository {
  async findAll(): Promise<Product[]> {
    return await prisma.product.findMany({
      include: { variants: true, categories: true },
    });
  }

  async findById(productId: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: { id: productId },
      include: { variants: true, categories: true },
    });
  }

  async getProductById(productId: string) {
    return await prisma.product.findUnique({
      where: { id: productId },
      include: { categories: true, tags: true },
    });
  }

  async createProduct(data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    categories: number[];
  }): Promise<Product> {
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        images: data.images,
        categories: {
          connect: data.categories.map((categoryId) => ({ id: categoryId })),
        },
      },
    });
  }

  async updateProduct(
    productId: string,
    data: Partial<Product>
  ): Promise<Product> {
    return await prisma.product.update({
      where: { id: productId },
      data,
    });
  }

  async deleteProduct(productId: string): Promise<void> {
    await prisma.product.delete({ where: { id: productId } });
  }
}

export default new ProductRepository();
