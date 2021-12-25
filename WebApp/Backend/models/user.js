const mongoose = require("mongoose");
// const Joi = require("joi");
const jwt = require("jsonwebtoken");

let userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "user",
  },
  macAddress: [
    {
      type: String,
      default: "",
    },
  ],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWTSECRETKEY);
  return token;
};
let UserModel = new mongoose.model("User", userSchema);

exports.UserModel = UserModel;
// exports.validateUser = validateUser;
