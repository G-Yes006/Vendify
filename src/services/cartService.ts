import cartRepository from '../repositories/cartRepository';
import productRepository from '../repositories/productRepository';

class CartService {
  async getCartByUserId(userId: number) {
    let cart = await cartRepository.getCartByUserId(userId);
    if (!cart) {
      cart = await cartRepository.createCart(userId);
    }
    return cart;
  }

  async addItemToCart(userId: number, productId: number, quantity: number) {
    const cart = await this.getCartByUserId(userId);
    const product = await productRepository.getProductById(productId);

    if (!product || product.stock < quantity) {
      throw new Error('Product not available in requested quantity');
    }

    return await cartRepository.addItemToCart(cart.id, productId, quantity);
  }

  async removeItemFromCart(userId: number, productId: number) {
    const cart = await this.getCartByUserId(userId);
    return await cartRepository.removeItemFromCart(cart.id, productId);
  }

  async clearCart(userId: number) {
    const cart = await this.getCartByUserId(userId);
    return await cartRepository.clearCart(cart.id);
  }
}

export default new CartService();
