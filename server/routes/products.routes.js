const express = require("express");
const { createProduct } = require("../controllers/products.controllers");
const upload = require("../utils/multerConfig");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  createProduct
);

module.exports = router;
