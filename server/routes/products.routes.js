const express = require("express");
const {
  createProduct,
  getHomeProducts,
  getCategories,
  getBestSellingProducts,
  getLatestDealProduct,
  getHomeRecommendedProducts,
  getPaginatedProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/products.controllers");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");
const upload = require("../utils/multerConfig");

const router = express.Router();

router.post(
  "/",
  auth,
  checkRole("admin"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  createProduct
);

router.get("/", getHomeProducts);

router.get("/categories", getCategories);

router.get("/bestSelling", getBestSellingProducts);

router.get("/latestDealProduct/:title", getLatestDealProduct);

router.get("/homeRecommendedProducts", getHomeRecommendedProducts);

router.get("/shop/:category?", getPaginatedProducts);

router.patch("/:name", auth, checkRole("admin"), updateProduct);

router.delete("/:name", auth, checkRole("admin"), deleteProduct);

module.exports = router;
