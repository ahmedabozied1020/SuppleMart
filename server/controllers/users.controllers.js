const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const util = require("util");
const jwt = require("jsonwebtoken");
const jwtSign = util.promisify(jwt.sign);
const { createUserSchema } = require("../utils/validations/users.validation");
const CustomError = require("../utils/errors/CustomError");
const { Admin } = require("mongodb");

exports.signup = async (req, res, next) => {
  const { error } = await createUserSchema.validateAsync(req.body);

  if (error) {
    return res.status(409).send({"error": "invalid data sent"});
  }

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).send({"error": "this email is already in use"});

  const user = new User({ name, email, password });
  await user.save();
  res.status(201).send({"success": "Successfully registered"});
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({"error": "invalid email or password"});
  // valid email
  const isMatched = await bcrypt.compare(password, user.password);
  if (isMatched) {
    // correct email and password
    const token = await jwtSign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    const {password, createdAt, updatedAt, __v, ..._user} = user._doc;
    res.send({ success: "successfully logged in", user: {..._user, token} });
  } else {
    res.status(400).send({"error": "invalid email or password"});
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
