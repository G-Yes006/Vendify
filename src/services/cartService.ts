import cartRepository from '../repositories/cartRepository';
import productRepository from '../repositories/productRepository';

class CartService {
  async getCartByUserId(userId: string) {
    let cart = await cartRepository.getCartByUserId(userId);
    if (!cart) {
      cart = await cartRepository.createCart(userId);
    }
    return cart;
  }

  async addItemToCart(userId: string, productId: string, quantity: number) {
    const cart = await this.getCartByUserId(userId);
    const product = await productRepository.getProductById(productId);

    if (!product || product.stock < quantity) {
      throw new Error('Product not available in requested quantity');
    }

    return await cartRepository.addItemToCart(cart.id, productId, quantity);
  }

  async removeItemFromCart(userId: string, productId: string) {
    const cart = await this.getCartByUserId(userId);
    return await cartRepository.removeItemFromCart(cart.id, productId);
  }

  async clearCart(userId: string) {
    const cart = await this.getCartByUserId(userId);
    return await cartRepository.clearCart(cart.id);
  }
}

export default new CartService();
