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

const paginatedProductsSchema = Joi.object({
  category: Joi.string().default("all"),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(12),
});

module.exports = {
  createProductSchema,
  paginatedProductsSchema,
};
