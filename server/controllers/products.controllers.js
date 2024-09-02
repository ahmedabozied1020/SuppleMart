const Product = require("../models/product.model");
const uploadToImageKit = require("../utils/imageKitConfig");
const CustomError = require("../utils/errors/CustomError");
const {
  createProductSchema,
  paginatedProductsSchema,
} = require("../utils/validations/products.validation");
const Category = require("../models/category.model");

const getHomeProducts = async (req, res, next) => {
  try {
    const products = await Product.find().limit(8);
    res.send(products);
  } catch (error) {
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

    const validCategories = await Category.find({ title: { $in: categories } });
    if (validCategories.length !== categories.length) {
      throw new CustomError("One or more categories are invalid", 400);
    }

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
    next(error);
  }
};

const getProducById = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = Product.findById(productId);

    if (!product) {
      throw new CustomError("Invalid product id", 404);
    }

    res.status(200).send({ success: "Product fetched successfully", product });
  } catch (error) {
    next(error);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { title } = req.body;

    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      return res.status(409).send({ error: "Category already exists" });
    }

    const newCategory = new Category({ title });
    await newCategory.save();
    res.status(201).send({ success: "Category created successfully" });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    const categoryAndProductCountObjects = await Promise.all(
      categories.map(async (category) => {
        const count = await Product.countDocuments({
          categories: { $in: [category.title] },
        });

        const firstProduct = await Product.findOne({
          categories: { $in: [category.title] },
        }).select("thumbnail");

        return {
          category: category.title,
          thumbnail: firstProduct ? firstProduct.thumbnail : null,
          count,
        };
      })
    );

    res.status(200).send(categoryAndProductCountObjects);
  } catch (error) {
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
      return res.status(404).send({ error: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};

const getPaginatedProducts = async (req, res, next) => {
  try {
    const category = req.query.category || "all";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
    const minRating = parseFloat(req.query.minRating);
    const searchQuery = req.query.search || "";

    const { error } = paginatedProductsSchema.validate({
      category,
      page,
      limit,
    });

    const skip = (page - 1) * limit;

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    if (category !== "all") {
      const categoryExists = await Category.exists({ title: category });
      if (!categoryExists) {
        throw new CustomError("Invalid category", 400);
      }
    }

    const query = category === "all" ? {} : { categories: { $in: [category] } };
    if (minPrice) query.price = { ...query.price, $gte: minPrice };
    if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
    if (minRating) query.rate = { ...query.rate, $gte: minRating };
    if (searchQuery) query.$text = { $search: searchQuery };

    const categorisedProductsCount = await Product.countDocuments(query);
    const paginatedProducts = await Product.find(query).skip(skip).limit(limit);
    const pagesNumber = Math.ceil(categorisedProductsCount / limit);

    res.status(200).send({
      paginatedProducts,
      pagination: {
        total: categorisedProductsCount,
        limit,
        pages: pagesNumber,
        page,
        prev: page > 1,
        next: page < pagesNumber,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      throw new CustomError("Invalid product id", 404);
    }

    res.status(200).send({ success: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getProductsByIds = async (req, res, next) => {
  try {
    const productsIds = req.body.productsIds;

    console.log(req.body)
    const products = await Promise.all(
      productsIds.map(async (id) => await Product.findById(id))
    );

    for (let i = 0; i < products.length; i++) {
      if (!products[i]) {
        throw new CustomError("One or more id is invalid", 400);
      }
    }

    res.status(200).send({ success: "Product Updated successfully", products });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { error } = createProductSchema.validate(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const oldProductId = req.params.id;
    const newData = req.body;

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
      newData.thumbnail = thumbnailUrl;
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
      newData.images = imagesUrls;
    }

    const updateProduct = await Product.findByIdAndUpdate(
      { _id: oldProductId },
      { $set: newData },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .send({ success: "Product Updated successfully", updateProduct });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getHomeProducts,
  getCategories,
  addCategory,
  getBestSellingProducts,
  getLatestDealProduct,
  getHomeRecommendedProducts,
  getPaginatedProducts,
  deleteProduct,
  updateProduct,
  getProductsByIds,
  getProducById,
};
