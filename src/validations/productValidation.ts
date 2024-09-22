import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional().allow(null, ''),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  images: Joi.array().items(Joi.string()).optional(),
  categoryId: Joi.string().uuid().required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional().allow(null, ''),
  price: Joi.number().positive().optional(),
  stock: Joi.number().integer().min(0).optional(),
  images: Joi.array().items(Joi.string()).optional(),
  categoryId: Joi.string().uuid().optional(),
});
