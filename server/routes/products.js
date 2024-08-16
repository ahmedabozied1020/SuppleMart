const express = require("express");
const { createProduct } = require("../controllers/products.js");

const router = express.Router();

router.get("/", createProduct);

module.exports = router;
