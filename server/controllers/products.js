const Product = require("../models/product");

const { default: mongoose } = require("mongoose");
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

    //Convert the recieved categories string to an array of their objectId
    const categoriesId = categories
      ? categories.map((categoryName) => mongoose.Types.ObjectId(categoryName))
      : [];

    const product = new Product({
      title,
      description,
      price,
      count,
      rate,
      categories: categoriesId,
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

module.exports = {};
