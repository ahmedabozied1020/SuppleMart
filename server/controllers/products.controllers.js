const Product = require("../models/product.model");

const uploadToImageKit = require("../utils/imageKitConfig");
const CustomError = require("../utils/errors/CustomError");
const {
  createProductSchema,
} = require("../utils/validations/products.validation");

const getProducts = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  const productCount = await Product.countDocuments();
  const products = await Product.find().skip(skip).limit(limit);

  const pagesNumber = Math.ceil(productCount / limit);

  res.send({
    products,
    pagination: {
      total: productCount,
      pages: pagesNumber,
      page,
      prev: page > 1,
      next: page < pagesNumber,
    },
  });
};

const createProduct = async (req, res, next) => {
  try {
    const { error } = createProductSchema.validate(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { title, description, price, count, rate, categories } = req.body;

    const lowerCaseCategories = categories.map((category) =>
      category.toLowerCase().trim()
    );

    let thumbnailUrl = null;
    let imagesUrls = [];

    // Handle thumbnail upload if provided
    if (req.files && req.files.thumbnail && req.files.thumbnail.length > 0) {
      const thumbnailFile = req.files.thumbnail[0];
      const imageKitResponse = await uploadToImageKit(
        thumbnailFile,
        thumbnailFile.originalname,
        "product_thumbnails"
      );
      thumbnailUrl = imageKitResponse.url;
    }

    // Handle multiple images upload if provided
    if (req.files && req.files.images && req.files.images.length > 0) {
      for (const file of req.files.images) {
        const imageKitResponse = await uploadToImageKit(
          file,
          file.originalname,
          "product_images"
        );
        imagesUrls.push(imageKitResponse.url);
      }
    }

    const product = new Product({
      title,
      description,
      price,
      count,
      rate,
      categories: lowerCaseCategories,
      thumbnail: thumbnailUrl,
      images: imagesUrls,
    });

    // Pre-save script will run to add "All" category if not present
    product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCategories = async (req, res, next) => {
  const categories = Product.schema.path("categories").options.enum;
  const productsCountInEachCategory = await Promise.all(
    categories.map((category) =>
      Product.find({ categories: { $all: [category] } })
    )
  );

  const CategoryAndProducts = categories.reduce((obj, category, index) => {
    obj[category] = productsCountInEachCategory[index];
    return obj;
  }, {});

  res.status(200).send(CategoryAndProducts);
};

// const getBestSellingProducts=async (req,res,next) => {
//   const
// }

module.exports = { createProduct, getProducts, getCategories };
