// validations/productValidation.js
const Joi = require("joi");

const createProductSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().max(500).required(),
  price: Joi.number().min(0).required(),
  count: Joi.number().min(0).required(),
  rate: Joi.number().min(0).max(5),
  categories: Joi.array().items(Joi.string()),
});

module.exports = {
  createProductSchema,
};
