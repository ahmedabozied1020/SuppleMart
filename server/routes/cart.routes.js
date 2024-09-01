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

router.get("/", auth, getCartItems);
router.post("/add", auth, addToCart);
router.put("/update", auth, updateCartItem);
router.delete("/delete", auth, removeCartItem);
module.exports = router;
