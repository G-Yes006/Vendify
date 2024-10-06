import Joi from 'joi';

export const addItemToCartSchema = Joi.object({
  productId: Joi.string().uuid().required(),
  quantity: Joi.number().integer().default(1),
});
