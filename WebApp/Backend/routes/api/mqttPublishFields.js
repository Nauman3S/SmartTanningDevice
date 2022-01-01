const express = require("express");
const router = express.Router();
const { UserModel } = require("../../models/user");

const mqttPublishFieldsModel = require("../../models/mqttPublishFields");

router.get("/:macAddress", async (req, res) => {
  let mqttPublishFields = await mqttPublishFieldsModel.findOne({
    macAddress: req.params.macAddress,
  });
  return res.status(200).send(mqttPublishFields);
});

router.put("/save/:macAddress", async (req, res) => {
  let {
    MachineSerialNumber,
    MachineType,
    CorrectPF,
    PaymentSystem,
    InstallDate,
  } = req.body;
  console.log(req.params.macAddress);

  let mqttPublishFields = await mqttPublishFieldsModel.findOneAndUpdate(
    { macAddress: req.params.macAddress },
    {
      MachineSerialNumber,
      MachineType,
      CorrectPF,
      PaymentSystem,
      InstallDate,
    }
  );

  return res.status(200).send("Fields Updatd");
});

module.exports = router;
