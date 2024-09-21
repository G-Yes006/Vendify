import orderRepository from '../repositories/orderRepository';

class OrderService {
  async createOrder(userId: string, totalPrice: number) {
    return await orderRepository.createOrder(userId, totalPrice);
  }

  async addItemToOrder(orderId: number, productId: string, quantity: number) {
    return await orderRepository.addItemToOrder(orderId, productId, quantity);
  }

  async getOrdersByUserId(userId: string) {
    return await orderRepository.getOrdersByUserId(userId);
  }

  async getOrderById(orderId: number) {
    return await orderRepository.getOrderById(orderId);
  }
}

export default new OrderService();
