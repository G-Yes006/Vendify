import { Router } from 'express';
import {
  getSalesReport,
  getInventoryReport,
  getUserInsights,
} from '../controllers/reportController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import { validate } from '../middlewares/validate';
import { getSalesReportSchema } from '../validations/reportValidation';

const router = Router();

router.get(
  '/sales',
  validate(getSalesReportSchema),
  authMiddleware,
  adminMiddleware,
  getSalesReport
);
router.get('/inventory', authMiddleware, adminMiddleware, getInventoryReport);
router.get('/users', authMiddleware, adminMiddleware, getUserInsights);

export default router;
