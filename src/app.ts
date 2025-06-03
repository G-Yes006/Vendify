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
    // Add timeout of 5 seconds for database check
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Database health check timeout')), 5000)
    );
    await Promise.race([prisma.$queryRaw`SELECT 1`, timeoutPromise]);
    res.status(200).json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown database error';
    res.status(500).json({
      status: 'Failed',
      database: 'Disconnected',
      error: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
});

// Register versioned routes
try {
  Object.values(routes).forEach((route) => {
    if (!route || typeof route !== 'object') {
      throw new Error('Invalid route configuration');
    }
    const { path, router } = route;
    if (!path || !router) {
      throw new Error(`Invalid route configuration for path: ${path}`);
    }
    const middleware = 'middleware' in route ? route.middleware : [];
    versionedRouter.use(path, router, ...middleware);
  });
} catch (error) {
  console.error('Failed to register routes:', error);
  process.exit(1);
}

// Register versioned router with API prefix
app.use(`${API_PREFIX}/${apiVersion}`, versionedRouter);

// Custom error interface
interface ApiError extends Error {
  statusCode?: number;
  code?: string;
}

// Error handling middleware
app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  console.error(`[Error] ${err.stack}`);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const errorCode = err.code || 'INTERNAL_ERROR';
  
  res.status(statusCode).json({
    status: 'error',
    code: errorCode,
    message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Disconnect Prisma on process exit
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;
