import app from './app';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { logSuccess, logError, logInfo, logWarn } from './utils/logUtils';

dotenv.config();

const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;

// Health Check Route for the API and Database
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      database: 'Disconnected',
      error: error.message,
    });
  }
});

// Function to start the server and connect to PostgreSQL
const startServer = async () => {
  try {
    await prisma.$connect();
    logSuccess('PostgreSQL connected successfully using Prisma.');

    app.listen(PORT, () => {
      logInfo(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logError(`Failed to connect to PostgreSQL using Prisma: ${error.message}`);
    process.exit(1); // Exit on failure
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
    logError(`Error during shutdown: ${error.message}`);
    process.exit(1);
  }
};

// Handle termination signals for graceful shutdown
process.on('SIGINT', gracefulShutdown); // Ctrl+C signal
process.on('SIGTERM', gracefulShutdown); // Termination signal

startServer();
