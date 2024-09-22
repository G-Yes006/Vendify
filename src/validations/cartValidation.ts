import Joi from 'joi';

export const addItemToCartSchema = Joi.object({
  productId: Joi.string().uuid().required(),
  quantity: Joi.number().integer().min(1).default(1),
});
