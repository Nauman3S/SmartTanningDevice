const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { UserModel } = require("../../models/user");
const mqttMessageModel = require("../../models/mqttmessage");

//get all users
router.get("/", async (req, res) => {
  try {
    let users = await UserModel.find();

    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

//register a new user
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

//login user
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

        return res.status(200).json({
          token: token,
          id: user.id,
          type: user.type,
          name: user.email,
          password: user.password,
        });
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

// Add new macAddress
router.put("/update/:id", async (req, res) => {
  console.log(req.body.macAddress);
  try {
    let macAd = req.body.macAddress;
    let checkExist = await UserModel.findById({ _id: req.params.id });
    console.log(checkExist.macAddress);

    const found = checkExist.macAddress.includes(`${req.body.macAddress}`);
    console.log(found);
    if (found) {
      console.log("Already exist");
      return res.status(200).send("This MacAddress is already exist");
    }
    let user = await UserModel.findByIdAndUpdate(req.params.id, {
      $push: { macAddress: req.body.macAddress },
    });
    await user.save();
    let checkInMqtt = await mqttMessageModel.findOne({
      macAddress: req.body.macAddress,
    });
    // console.log(checkInMqtt);
    if (checkInMqtt) {
      return res.status(200).send("Mac Address Added");
    } else {
      let mqttMessage = new mqttMessageModel({
        macAddress: req.body.macAddress,
        Alive: "",
        TotalRunningTime: "",
        TotalSessionCount: "",
        TotalSessionCorrectlyEnded: "",
        TotalSessionEndedBeforeTime: "",
        TotalSessionNotEndedCorrectly: "",
        StartSession: "",
        EndSession: "",
        EndSessionType: "",
        Temperature: "",
        AnemometerSensor: "",
        PresencePhases: "",
        SensorFilters: "",
        LampMaintenance: "",
        AnnualMaintenance: "",
        ActualLastTemp: "",
        HighestTemp: "",
        PowerFactorCorrection: "",
        PFDeviationFromOptimalLevel: "",
        LastFanSpeed: "",
        InputVoltage: "",
        Message: "",
      });
      mqttMessage.save();
    }
    return res.send("Data saved");
  } catch (err) {
    console.log(err);
  }
});

//get user by id
router.get("/getUser/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    let user = await UserModel.findById(req.params.id);
    return res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

//update username or password
router.put("/updateUser/:id", async (req, res) => {
  // console.log(req.params.id);

  try {
    console.log(req.params.id);
    const { email, oldPassword, newPassword } = req.body;

    let checkPass = await UserModel.findById(req.params.id);

    let found = await bcrypt.compare(oldPassword, checkPass.password);
    // console.log(found);
    if (found) {
      const hashPassword = await bcrypt.hash(newPassword, 10);

      let user = await UserModel.findByIdAndUpdate(req.params.id, {
        email: email,
        password: hashPassword,
      });
      return res.status(200).send("Updated");
    } else {
      return res.send("wrong");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

//get user macAddresses
router.get("/getMacAddress/:id", async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id);
    return res.send(user.macAddress);
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
});

//get all user mac addresses
router.get("/getAllUsersMac", async (req, res) => {
  try {
    let user = await UserModel.find().distinct("macAddress");

    return res.send(user);
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
});

//delete mac address
router.put("/deleteMacAddress", async (req, res) => {
  console.log(req.body.macAddress);
  let user = await UserModel.update({
    $pull: { macAddress: req.body.macAddress },
  });
  let mqttMsg = await mqttMessageModel.deleteOne({
    macAddress: req.body.macAddress,
  });

  console.log(mqttMsg);
  return res.send(user);
});

module.exports = router;
