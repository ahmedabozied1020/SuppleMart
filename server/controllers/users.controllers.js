const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const util = require("util");
const jwt = require("jsonwebtoken");
const jwtSign = util.promisify(jwt.sign);
const { createUserSchema } = require("../utils/validations/users.validation");
const CustomError = require("../utils/errors/CustomError");
const { Admin } = require("mongodb");

exports.signup = async (req, res, next) => {
  try {
    const { error } = createUserSchema.validate(req.body);

    if(error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
if (existingUser){
      throw new CustomError("this email is already in use", 409);
    }

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send({ success: "Successfully registered" });
  } catch (error) {
    next(error);
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
    if (!user) return res.send("invalid email or password");
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

      res.send({ message: "user logged in", token, user });
    } else {
      res.send("invalid email or password");
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
    throw new CustomError(error.details[0].message, 500);
  }
};
    if (existingUser){
      throw new CustomError("this email is already in use", 409);
    }

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send({ success: "Successfully registered" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).send({ error: "invalid email or password" });
  // valid email
  const isMatched = await bcrypt.compare(password, user.password);
  if (isMatched) {
    // correct email and password
    const token = await jwtSign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    const { password, createdAt, updatedAt, __v, ..._user } = user._doc;
    res.send({ success: "successfully logged in", user: { ..._user, token } });
  } else {
    res.status(400).send({ error: "invalid email or password" });
  }
};

// exports.creatAdmin = async (req, res) => {
//   const { email, password, role } = req.body;
// };
// const { email, password, role } = req.body;
// const existingUser = await User.findOne({ email });
// if (existingUser) return res.status(409).send("Email is Already Used.");
// const user = new User({ email, password, role: "admin" });
// await user.save();
// res.send({ message: "Admin Created", user });
