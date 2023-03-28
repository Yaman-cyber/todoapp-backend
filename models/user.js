const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
      default: "user",
    },

    forgotPassword: { code: { type: String }, expTime: { type: Date } },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    config.get("jwtPrivatekey"),
    { expiresIn: "30d" }
  );

  return token;
};

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

exports.User = User;
