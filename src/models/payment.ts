import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PaymentStatus = {
  Pending: 'Pending',
  Completed: 'Completed',
  Failed: 'Failed',
};

export const createPaymentModel = async () => {
  await prisma.$executeRaw(`
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users(id),
      orderId INTEGER REFERENCES orders(id),
      paymentMethod VARCHAR(255),
      paymentGateway VARCHAR(255),
      amount DECIMAL(10, 2),
      status VARCHAR(50) DEFAULT '${PaymentStatus.Pending}',    
      transactionId VARCHAR(255) UNIQUE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};
