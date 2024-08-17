const Product = require("../models/product.model");

const CustomError = require("../utils/errors/CustomError");
const {
  createProductSchema,
} = require("../utils/validations/products.validation");

const createProduct = async (req, res, next) => {
  try {
    const { error } = createProductSchema.validate(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const {
      title,
      description,
      price,
      count,
      rate,
      categories,
      thumbnail,
      images,
    } = req.body;

    const lowerCaseCategories = categories.map((category) =>
      category.toLowerCase()
    );

    const product = new Product({
      title,
      description,
      price,
      count,
      rate,
      categories: lowerCaseCategories,
      thumbnail,
      images,
    });

    // Pre-save script will run to add "All" category if not present
    product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createProduct };
