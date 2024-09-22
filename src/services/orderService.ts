import orderRepository from '../repositories/orderRepository';

class OrderService {
  async createOrder(userId: string, totalPrice: number) {
    return await orderRepository.createOrder(userId, totalPrice);
  }

  async addItemToOrder(orderId: string, productId: string, quantity: number) {
    return await orderRepository.addItemToOrder(orderId, productId, quantity);
  }

  async getOrdersByUserId(userId: string) {
    return await orderRepository.getOrdersByUserId(userId);
  }

  async getOrderById(orderId: string) {
    return await orderRepository.getOrderById(orderId);
  }

  async updateOrderStatus(orderId: string, status: string) {
    return await orderRepository.updateOrderStatus(orderId, status);
  }
}

export default new OrderService();
