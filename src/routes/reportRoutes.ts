import { Router } from 'express';
import {
  getSalesReport,
  getInventoryReport,
  getUserInsights,
} from '../controllers/reportController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const router = Router();

router.get('/sales', authMiddleware, adminMiddleware, getSalesReport);
router.get('/inventory', authMiddleware, adminMiddleware, getInventoryReport);
router.get('/users', authMiddleware, adminMiddleware, getUserInsights);

export default router;
