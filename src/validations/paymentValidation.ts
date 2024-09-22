import Joi from 'joi';

export const createPaymentSchema = Joi.object({
  orderId: Joi.string().uuid().required(),
  amount: Joi.number().positive().required(),
  method: Joi.string().required(),
  status: Joi.string().valid('pending', 'completed', 'failed').optional(),
});
