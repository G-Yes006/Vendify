import express, { NextFunction, Request, Response } from 'express';
import routes from './routes/routes';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import { PrismaClient } from '@prisma/client';

const app = express();
const apiVersion = process.env.API_VERSION || 'v1';
const API_PREFIX = '/api';
const versionedRouter = express.Router();
const prisma = new PrismaClient();

// Global middleware
app.use(express.json());
app.use(loggerMiddleware);

// Health check endpoint (unversioned)
app.get(`${API_PREFIX}/health`, async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown database error';
    res.status(500).json({
      status: 'Failed',
      database: 'Disconnected',
      error: errorMessage,
    });
  }
});

// Register versioned routes
Object.values(routes).forEach((route) => {
  const { path, router } = route;
  const middleware = 'middleware' in route ? route.middleware : [];
  versionedRouter.use(path, router, ...middleware);
});

// Register versioned router with API prefix
app.use(`${API_PREFIX}/${apiVersion}`, versionedRouter);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
