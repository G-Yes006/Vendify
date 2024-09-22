import Joi from 'joi';

export const getSalesReportSchema = Joi.object({
  startDate: Joi.date().iso().required().messages({
    'date.base': '"startDate" must be a valid date',
    'date.format': '"startDate" must follow the ISO format',
    'any.required': '"startDate" is a required field',
  }),
  endDate: Joi.date().iso().required().messages({
    'date.base': '"endDate" must be a valid date',
    'date.format': '"endDate" must follow the ISO format',
    'any.required': '"endDate" is a required field',
  }),
});
