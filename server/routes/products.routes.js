const express = require("express");
const { createProduct } = require("../controllers/products.controllers.js");

const router = express.Router();

router.post("/", createProduct);

module.exports = router;
