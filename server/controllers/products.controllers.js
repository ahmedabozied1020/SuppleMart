const Product = require("../models/product.model");

const uploadToImageKit = require("../utils/imageKitConfig");
const CustomError = require("../utils/errors/CustomError");
const {
  createProductSchema,
} = require("../utils/validations/products.validation");

const getProducts = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.error("Error fetching products:", error);
    next(error);
  }
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
    console.error("Error creating product:", error);
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = Product.schema.path("categories").options.enum;
    const categoryAndProductCountObjects = await Promise.all(
      categories.map(async (category) => {
        const count = await Product.countDocuments({
          categories: { $all: [category] },
        });
        return { category, count };
      })
    );

    res.status(200).send(categoryAndProductCountObjects);
  } catch (error) {
    console.error("Error fetching categories:", error);
    next(error);
  }
};

const getBestSellingProducts = async (req, res, next) => {
  try {
    const bestSellingProducts = await Product.find()
      .sort({ salesCount: -1 })
      .limit(5);

    res.status(200).send(bestSellingProducts);
  } catch (error) {
    console.error("Error fetching best-selling products:", error);
    next(error);
  }
};

const getHomeRecommendedProducts = async (req, res, next) => {
  try {
    const recommendedProducts = await Product.find()
      .limit(5)
      .select("title thumbnail price rate");

    res.status(200).send(recommendedProducts);
  } catch (error) {
    next(error);
  }
};

const getLatestDealProduct = async (req, res, next) => {
  try {
    const { title } = req.params;
    const product = await Product.find({ title });
    res.status(200).send(product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching latest-deal product:", error);
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getCategories,
  getBestSellingProducts,
  getLatestDealProduct,
  getHomeRecommendedProducts,
};
