import prisma from '../config/db';

class CartRepository {
  async getCartByUserId(userId: number) {
    return await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
  }

  async createCart(userId: number) {
    return await prisma.cart.create({
      data: { userId },
    });
  }

  async addItemToCart(cartId: number, productId: number, quantity: number) {
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId, productId },
    });

    if (existingItem) {
      return await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return await prisma.cartItem.create({
      data: { cartId, productId, quantity },
    });
  }

  async removeItemFromCart(cartId: number, productId: number) {
    return await prisma.cartItem.deleteMany({
      where: { cartId, productId },
    });
  }

  async clearCart(cartId: number) {
    return await prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }
}

export default new CartRepository();
