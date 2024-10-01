import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('user', 'admin').optional(),
});

export const updateUserRoleSchema = Joi.object({
  role: Joi.string().required(),
  userId: Joi.string().min(8).required(),
});
