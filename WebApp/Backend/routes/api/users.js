const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { UserModel } = require("../../models/user");

router.get("/", async (req, res) => {
  try {
    let users = await UserModel.find();

    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    let { email, password, confirmPassword } = req.body;

    let user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).send("User Already Registered.");
    }

    if (!email || !password || !confirmPassword) {
      return res.send("All Feilds are Required");
    }

    if (password === confirmPassword) {
      const hashPassword = await bcrypt.hash(password, 10);

      let user = new UserModel();
      user.email = email;
      user.password = hashPassword;
      user.confirmPassword = hashPassword;
      await user.save();

      const token = user.generateAuthToken();
      return res
        .header("x-auth-token", token)
        .send(_.pick(user, ["_id", "email"]));
    } else {
      return res.status(400).send("Password Not Matached");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).send("Invalid Email or Password");
    }
    await bcrypt.compare(password, user.password, (err, valid) => {
      if (valid) {
        const token = user.generateAuthToken();

        return res.status(200).send(token);
      }
      if (!valid) {
        return res.status(400).send("Invalid Email or Password");
      }
    });
    // return res.json();
    // return res.header("x-auth-token", email).send("sucess");
  } catch (err) {
    console.log(err);
  }
});

router.put("/update/:id", async (req, res) => {
  console.log("put");
  try {
    let user = await UserModel.findByIdAndUpdate(req.params.id, {
      $push: { macAddress: req.body.macAddress },
    });
    await user.save();
    return res.send("Data saved");
  } catch (err) {
    console.log(err);
  }
});

router.get("/getMacAddress/:id", async (req, res) => {
  let user = await UserModel.findById(req.params.id);
  return res.send(user.macAddress);
});

module.exports = router;
