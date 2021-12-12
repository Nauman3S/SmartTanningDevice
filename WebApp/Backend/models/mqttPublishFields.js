const mongoose = require("mongoose");

let mqttPublishFieldsSchema = mongoose.Schema({
  macAddress: {
    type: String,
    required: true,
  },
  MachineSerialNumber: {
    type: String,
  },
  MachineType: {
    type: String,
  },
  CorrectPF: {
    type: String,
  },
  PaymentSystem: {
    type: String,
  },
  InstallDate: {
    type: String,
  },
});

let mqttPublishFieldsModel = new mongoose.model(
  "Mqttpublishfield",
  mqttPublishFieldsSchema
);

module.exports = mqttPublishFieldsModel;
