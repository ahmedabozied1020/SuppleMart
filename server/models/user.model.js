const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

// Pre-save script to add "All" category if not present
userSchema.pre("save", async function () {
  if (this.isModifies("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = model("User", userSchema);

module.exports = User;
