const mongoose = require("mongoose");
// const Joi = require("joi");
const jwt = require("jsonwebtoken");

let userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  macAddress: [
    {
      type: String,
      default: "",
    },
  ],
});

// function validateUser(user) {
//   const schema = {
//     email: Joi.string().min(5).max(255).required().email(),
//   };
//
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWTSECRETKEY);
  return token;
};
let UserModel = new mongoose.model("User", userSchema);

exports.UserModel = UserModel;
// exports.validateUser = validateUser;
