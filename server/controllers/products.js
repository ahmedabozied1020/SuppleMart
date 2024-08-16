//TODO: product controller

const createProduct = async (req, res, next) => {
  try {
    const { error } = createProductSchema.validate(req.body);

    const {
      title,
      description,
      price,
      count,
      rate,
      categories,
      thumbnail,
      images,
    } = req.body;
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {};
