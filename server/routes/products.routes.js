const express = require("express");
const {
  createProduct,
  getProducts,
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

router.get("/", getProducts); //auth middlware is required

module.exports = router;
