import Joi from 'joi';

export const createOrderSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().uuid().required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().integer().min(1).required(),
      })
    )
    .required(),
  totalAmount: Joi.number().positive().required(),
  status: Joi.string()
    .valid('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED')
    .optional(),
});

export const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED')
    .required(),
  orderId: Joi.string().uuid().required(),
});
