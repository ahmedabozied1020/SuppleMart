const User = require("../models/user.model");

const jwt = require("jsonwebtoken");
const util = require("util");
const CustomError = require("../utils/errors/CustomError");

const jwtVerify = util.promisify(jwt.verify);

module.exports = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    const payload = await jwtVerify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.userId);

    if (!user) throw new CustomError("unAuthenticated", 400);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
