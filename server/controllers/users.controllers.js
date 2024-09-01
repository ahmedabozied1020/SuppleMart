const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const util = require("util");
const jwt = require("jsonwebtoken");
const jwtSign = util.promisify(jwt.sign);
const { createUserSchema } = require("../utils/validations/users.validation");
const CustomError = require("../utils/errors/CustomError");
const Product = require("../models/product.model");

exports.signup = async (req, res, next) => {
  try {
    const { error } = await createUserSchema.validateAsync(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send("Email is already used.");

    const user = new User({ name, email, password });
    await user.save();
    res.send({ message: "User created", user });
  } catch (error) {
    throw new CustomError(error.details[0].message, 500);
  }
};

const mergeNonLoggedInUserCart = async (userId, cartItems) => {
  // console.log(userId);
  // console.log(cartItems);

  for (let item of cartItems) {
    if (
      !item.productId ||
      typeof item.quantity !== "number" ||
      item.quantity <= 0
    ) {
      throw new CustomError("Invalid productId or quantity", 400);
    }
  }

  const user = await User.findById(userId).populate("cart.productId");
  // console.log(user);
  const incomingProductIds = new Set(
    cartItems.map((item) => item.productId.toString())
  );
  // console.log(incomingProductIds);
  user.cart = user.cart.filter((cartItem) => {
    const productId = cartItem._id.toString();
    if (!incomingProductIds.has(productId)) {
      return false;
    }
    return true;
  });
  // console.log(user.cart);

  for (let item of cartItems) {
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new CustomError(`Product with id ${item.productId} not found`, 404);
    }

    const existingCartItem = user.cart.find((cartItem) => {
      console.log(cartItem);
      cartItem._id.toString() === item.productId;
    });

    console.log(existingCartItem);

    if (existingCartItem) {
      existingCartItem.quantity = item.quantity;
    } else {
      if (item.quantity > 0) {
        user.cart.push({ product, quantity: item.quantity });
      } else {
        throw new CustomError(
          "Cannot add product with negative or zero quantity",
          400
        );
      }
    }
  }

  await user.save();
};

exports.login = async (req, res) => {
  try {
    const { email, password, cart } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send({ error: "invalid email or password"});
    // valid email
    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
      // correct email and password
      const token = await jwtSign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        }
      );

      if (cart) {
        await mergeNonLoggedInUserCart(user._id, req.body.cart);
      }

      res.send({ success: "user logged in", token, user });
    } else {
      res.send({ error: "invalid email or password"});
    }
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
};

exports.createAdmin = async (req, res, next) => {
  try {
    const { error } = await createUserSchema.validateAsync(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send("Email is Already Used.");
    const user = new User({ name, email, password, role: "admin" });
    await user.save();
    res.status(201).send({ message: "Admin Created", user });
  } catch (error) {
    throw new CustomError(error.details[0].message, 500);
  }
};