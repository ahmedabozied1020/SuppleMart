const express = require("express");
const {
  createProduct,
  getProducts,
  getCategories,
  getBestSellingProducts,
  getLatestDealProduct,
  getHomeRecommendedProducts,
} = require("../controllers/products.controllers");
const upload = require("../utils/multerConfig");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  createProduct
); // auth and restrectedTo middlwares are required

router.get("/products", getProducts); //auth middlware is required

router.get("/categories", getCategories);

router.get("/bestSelling", getBestSellingProducts);

router.get("/latestDealProduct/:title", getLatestDealProduct);

router.get("/homeRecommendedProducts", getHomeRecommendedProducts);

module.exports = router;
