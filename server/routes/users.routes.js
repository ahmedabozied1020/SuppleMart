const express = require("express");
const {
  signup,
  login,
  createAdmin,
} = require("../controllers/users.controllers");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/createAdmin", auth, checkRole("admin"), createAdmin);
module.exports = router;
