import { authMiddleware } from '../middlewares/authMiddleware';
import productRoutes from './productRoutes';
import categoryRoutes from './categoryRoutes';
import userRoutes from './userRoutes';
import cartRoutes from './cartRoutes';
import orderRoutes from './orderRoutes';
import reportRoutes from './reportRoutes';
import paymentRoutes from './paymentRoutes';
import authRoutes from './authRoutes';

const routes = {
  auth: { path: '/auth', router: authRoutes },
  products: {
    path: '/products',
    router: productRoutes,
    middleware: [authMiddleware],
  },
  categories: {
    path: '/categories',
    router: categoryRoutes,
    middleware: [authMiddleware],
  },
  users: { path: '/users', router: userRoutes },
  cart: { path: '/cart', router: cartRoutes, middleware: [authMiddleware] },
  orders: {
    path: '/orders',
    router: orderRoutes,
    middleware: [authMiddleware],
  },
  reports: {
    path: '/reports',
    router: reportRoutes,
    middleware: [authMiddleware],
  },
  payments: {
    path: '/payments',
    router: paymentRoutes,
    middleware: [authMiddleware],
  },
};

export default routes;
