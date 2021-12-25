const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const checkModel = require("../../models/check");

router.get("/", async (req, res) => {
  let check = await checkModel.find();
  return res.status(200).send(check);
});

router.put("/", async (req, res) => {
  let ch = await checkModel.find().select("_id");
  console.log(ch[0].id);

  let check = await checkModel.findByIdAndUpdate(
    { _id: ch[0].id },
    {
      Alive: req.body.Alive,
      TotalRunningTime: req.body.TotalRunningTime,
      TotalSessionCount: req.body.TotalSessionCount,
      TotalSessionCorrectlyEnded: req.body.TotalSessionCorrectlyEnded,
      TotalSessionEndedBeforeTime: req.body.TotalSessionEndedBeforeTime,
      TotalSessionNotEndedCorrectly: req.body.TotalSessionNotEndedCorrectly,
      StartSession: req.body.StartSession,
      EndSession: req.body.EndSession,
      EndSessionType: req.body.EndSessionType,
      Temperature: req.body.Temperature,
      AnemometerSensor: req.body.AnemometerSensor,
      PresencePhases: req.body.PresencePhases,
      SensorFilters: req.body.SensorFilters,
      LampMaintenance: req.body.LampMaintenance,
      AnnualMaintenance: req.body.AnnualMaintenance,
      ActualLastTemp: req.body.ActualLastTemp,
      HighestTemp: req.body.HighestTemp,
      PowerFactorCorrection: req.body.PowerFactorCorrection,
      PFDeviationFromOptimalLevel: req.body.PFDeviationFromOptimalLevel,
      LastFanSpeed: req.body.LastFanSpeed,
      InputVoltage: req.body.InputVoltage,
      Message: req.body.Message,
      MachineSerialNumber: req.body.MachineSerialNumber,
      MachineType: req.body.MachineType,
      CorrectPF: req.body.CorrectPF,
      PaymentSystem: req.body.PaymentSystem,
      InstallDate: req.body.InstallDate,
      macAddress: req.body.macAddress,
      Timestamp: req.body.Timestamp,
      Poll: req.body.Poll,
      Transmit: req.body.Transmit,
    }
  );
  check.save();
  return res.status(200).send("Check Updated");
});
router.post("/", async (req, res) => {
  let check = new checkModel({});
  check.save();
  return res.status(200).send("Check Added");
});

module.exports = router;
