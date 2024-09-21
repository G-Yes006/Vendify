import prisma from '../config/db';

class CartRepository {
  async getCartByUserId(userId: string) {
    return await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
  }

  async createCart(userId: string) {
    return await prisma.cart.create({
      data: { userId },
    });
  }

  async addItemToCart(cartId: string, productId: string, quantity: number) {
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

  async removeItemFromCart(cartId: string, productId: string) {
    return await prisma.cartItem.deleteMany({
      where: { cartId, productId },
    });
  }

  async clearCart(cartId: string) {
    return await prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }
}

export default new CartRepository();
