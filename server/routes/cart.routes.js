const express = require("express");
const {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cart.controllers");
const { addToCartWithoutLogin } = require("../controllers/users.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", getCartItems);
router.post("/", addToCart);
router.put("/", updateCartItem);
router.delete("/", removeCartItem);

module.exports = router;
