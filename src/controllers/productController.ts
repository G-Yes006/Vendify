import { Request, Response } from 'express';
import productService from '../services/productService';
import { handleError } from '../utils/errorHandler';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    handleError(res, err);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await productService.getProductById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    handleError(res, err);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, images, categoryId } = req.body;
    const product = await productService.createProduct({
      name,
      description,
      price,
      stock,
      images,
      categoryId,
    });
    res.status(201).json(product);
  } catch (err) {
    handleError(res, err);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    const updatedProduct = await productService.updateProduct(
      productId,
      productData
    );
    res.json(updatedProduct);
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await productService.deleteProduct(productId);
    res.status(200).json({
      success: true,
      message: 'Product has been deleted successfully',
    });
  } catch (err) {
    handleError(res, err);
  }
};
