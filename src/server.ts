import app from './app';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { logSuccess, logError, logInfo, logWarn } from './utils/logUtils';
import rateLimiter from './utils/rateLimiter';
import requestRateSmoothing from './utils/requestRateSmoothing';
dotenv.config();

const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;
const REQUEST_LIMIT = Number(process.env.REQUEST_LIMIT) || 100;
const DELAY_THRESHOLD = Number(process.env.DELAY_THRESHOLD) || 500;
const DELAY_INCREMENT = Number(process.env.DELAY_INCREMENT) || 100;
// Apply rate-limiting middleware globally
app.use(rateLimiter(REQUEST_LIMIT, 15 * 60 * 1000));

// Apply request smoothing
app.use(requestRateSmoothing(DELAY_THRESHOLD, DELAY_INCREMENT));

// Health Check Route for the API and Database

// Function to start the server and connect to PostgreSQL
const startServer = async () => {
  try {
    await prisma.$connect();
    logSuccess('PostgreSQL connected successfully using Prisma.');

    app.listen(PORT, () => {
      logInfo(`Server running on port ${PORT}`);
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown connection error';
    logError(`Failed to connect to PostgreSQL using Prisma: ${errorMessage}`);
    process.exit(1);
  }
};

// Graceful Shutdown
const gracefulShutdown = async () => {
  logWarn('Received shutdown signal. Shutting down server...');
  try {
    await prisma.$disconnect();
    logWarn('Prisma disconnected successfully.');
    process.exit(0);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown shutdown error';
    logError(`Error during shutdown: ${errorMessage}`);
    process.exit(1);
  }
};

// Handle termination signals for graceful shutdown
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

startServer();
