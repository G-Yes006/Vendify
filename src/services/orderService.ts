import orderRepository from '../repositories/orderRepository';

class OrderService {
  async createOrder(userId: number, totalPrice: number) {
    return await orderRepository.createOrder(userId, totalPrice);
  }

  async addItemToOrder(orderId: number, productId: number, quantity: number) {
    return await orderRepository.addItemToOrder(orderId, productId, quantity);
  }

  async getOrdersByUserId(userId: number) {
    return await orderRepository.getOrdersByUserId(userId);
  }

  async getOrderById(orderId: number) {
    return await orderRepository.getOrderById(orderId);
  }
}

export default new OrderService();
