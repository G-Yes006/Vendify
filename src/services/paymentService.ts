import paymentRepository from '../repositories/paymentRepository';
import { stripe } from '../config/stripe'; // Example for Stripe integration

class PaymentService {
  async createPaymentIntent(orderId: number, amount: number) {
    // Integrate with payment gateway (Stripe in this case)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // convert to cents
      currency: 'usd',
      metadata: { orderId },
    });

    await paymentRepository.createPayment(orderId, amount, 'pending', 'stripe');

    return paymentIntent.client_secret; // return client secret to complete payment on the frontend
  }

  async handlePaymentSuccess(paymentId: number) {
    await paymentRepository.updatePaymentStatus(paymentId, 'completed');
    // Handle further post-payment logic (e.g., update order status)
  }

  async handlePaymentFailure(paymentId: number) {
    await paymentRepository.updatePaymentStatus(paymentId, 'failed');
  }

  async getPaymentStatus(paymentId: number) {
    return await paymentRepository.getPaymentById(paymentId);
  }
}

export default new PaymentService();
