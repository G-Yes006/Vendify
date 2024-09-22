import prisma from '../config/db';

class OrderRepository {
  async createOrder(userId: string, orderData: any) {
    return await prisma.order.create({
      data: {
        userId,
        total: orderData.total,
        items: {
          create: orderData.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
  }

  async getOrderById(orderId: string) {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });
  }

  async getOrdersByUserId(userId: string) {
    return await prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
  }

  async addItemToOrder(orderId: string, productId: string, quantity: number) {
    return await prisma.orderItem.create({
      data: { orderId, productId, quantity },
    });
  }

  async updateOrderStatus(orderId: string, status: string) {
    return await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
}

export default new OrderRepository();
