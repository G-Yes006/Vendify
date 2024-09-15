import prisma from '../config/db';

class ReportRepository {
  async getSalesReport(startDate: Date, endDate: Date) {
    return await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        status: 'Completed',
      },
      select: {
        id: true,
        totalAmount: true,
        createdAt: true,
        items: true,
      },
    });
  }

  async getInventoryReport() {
    return await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        stock: true,
        price: true,
      },
      orderBy: {
        stock: 'asc',
      },
    });
  }

  async getUserInsights() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        orders: {
          select: {
            id: true,
            totalAmount: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }
}

export default new ReportRepository();
