import { Request, Response } from 'express';
import categoryService from '../services/categoryService';
import { handleError } from '../utils/errorHandler';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (err) {
    handleError(res, err);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await categoryService.createCategory(name);
    res.status(201).json(category);
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    await categoryService.deleteCategory(categoryId);
    res.status(200).json({
      message: "Category has been deleted successfully"
    });
  } catch (err) {
    handleError(res, err);
  }
};
