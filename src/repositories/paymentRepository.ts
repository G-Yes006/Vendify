import prisma from '../config/db';

class PaymentRepository {
  async createPayment(
    orderId: string,
    amount: number,
    status: string,
    paymentGateway: string
  ) {
    return await prisma.payment.create({
      data: {
        orderId,
        amount,
        status,
        paymentGateway,
      },
    });
  }

  async updatePaymentStatus(paymentId: number, status: string) {
    return await prisma.payment.update({
      where: { id: paymentId },
      data: { status },
    });
  }

  async getPaymentById(paymentId: number) {
    return await prisma.payment.findUnique({
      where: { id: paymentId },
    });
  }

  async getPaymentsForOrder(orderId: string) {
    return await prisma.payment.findMany({
      where: { orderId },
    });
  }
}

export default new PaymentRepository();
