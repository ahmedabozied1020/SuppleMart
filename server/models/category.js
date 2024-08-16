const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ name: 1 });

categorySchema.pre("save", function (next) {
  this.name = this.name.toLowerCase();
  next();
});

categorySchema.virtual("productCount").get(function () {
  return this.products.length;
});

const Category = model("Category", categorySchema);

module.exports = Category;
