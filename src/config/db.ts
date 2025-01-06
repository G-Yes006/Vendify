import { PrismaClient } from '@prisma/client';
import { logSuccess, logError, logInfo } from '../utils/logUtils';

const prisma = new PrismaClient();

const initializeDatabase = async () => {
    const dbType = process.env.DATABASE_TYPE || 'postgres';
    
    try {
        logInfo(`Initializing ${dbType} database connection...`);
        await prisma.$connect();
        
        // Verify connection with a simple query
        await prisma.$queryRaw`SELECT 1`;
        
        logSuccess(`Database (${dbType}) connected successfully`);
        return prisma;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        logError(`Database connection failed: ${errorMessage}`);
        throw new Error(`Database initialization failed: ${errorMessage}`);
    }
};

// Cleanup function for graceful shutdown
const disconnectDatabase = async () => {
    await prisma.$disconnect();
    logInfo('Database connection closed');
};

export { prisma, initializeDatabase, disconnectDatabase };
export default prisma;