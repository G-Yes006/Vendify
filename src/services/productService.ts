import productRepository from '../repositories/productRepository';
import { Product } from '@prisma/client';

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    return await productRepository.findAll();
  }

  async getProductById(productId: string): Promise<Product | null> {
    return await productRepository.findById(productId);
  }

  async createProduct(data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    categories: number[];
  }): Promise<Product> {
    return await productRepository.createProduct(data);
  }

  async updateProduct(
    productId: string,
    data: Partial<Product>
  ): Promise<Product> {
    return await productRepository.updateProduct(productId, data);
  }

  async deleteProduct(productId: string): Promise<void> {
    return await productRepository.deleteProduct(productId);
  }
}

export default new ProductService();
