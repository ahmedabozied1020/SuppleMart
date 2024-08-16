//TODO: product controller

const createProductSchema = require("../utils/validations/products");

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
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {};
