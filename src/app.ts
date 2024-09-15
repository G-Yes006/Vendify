import express from 'express';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import userRoutes from './routes/userRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import reportRoutes from './routes/reportRoutes';
import paymentRoutes from './routes/paymentRoutes';
import authRoutes from './routes/authRoutes';
import { authMiddleware } from './middlewares/authMiddleware';
const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', authMiddleware, productRoutes);
app.use('/categories', authMiddleware, categoryRoutes);
app.use('/users', userRoutes);
app.use('/cart', authMiddleware, cartRoutes);
app.use('/orders', authMiddleware, orderRoutes);
app.use('/reports', authMiddleware, reportRoutes);
app.use('/payments', authMiddleware, paymentRoutes);

export default app;
