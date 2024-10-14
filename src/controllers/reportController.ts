import { Request, Response } from 'express';
import reportService from '../services/reportService';
import { handleError } from '../utils/errorHandler';

export const getSalesReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.body;
    const salesReport = await reportService.getSalesReport(
      new Date(startDate as string),
      new Date(endDate as string)
    );
    res.json(salesReport);
  } catch (err) {
    handleError(res, err);
  }
};

export const getInventoryReport = async (req: Request, res: Response) => {
  try {
    const inventoryReport = await reportService.getInventoryReport();
    res.json(inventoryReport);
  } catch (err) {
    handleError(res, err);
  }
};

export const getUserInsights = async (req: Request, res: Response) => {
  try {
    const userInsights = await reportService.getUserInsights();
    res.json(userInsights);
  } catch (err) {
    handleError(res, err);
  }
};
