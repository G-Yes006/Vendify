import app from './app';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

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
    console.log('PostgreSQL connected successfully using Prisma.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to PostgreSQL using Prisma:', error);
    process.exit(1);
  }
};

// Graceful Shutdown
const gracefulShutdown = async () => {
  console.log('Shutting down server...');
  try {
    await prisma.$disconnect();
    console.log('Prisma disconnected successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

// Handle termination signals for graceful shutdown
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

startServer();
