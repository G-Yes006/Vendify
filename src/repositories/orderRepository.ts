import prisma from '../config/db';

class OrderRepository {
  async createOrder(userId: number, orderData: any) {
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

  async getOrderById(orderId: number) {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });
  }

  async updateOrderStatus(orderId: number, status: string) {
    return await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
}

export default new OrderRepository();
