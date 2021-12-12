const mongoose = require("mongoose");

let mqttMessageSchema = mongoose.Schema(
  {
    macAddress: {
      type: String,
    },
    Alive: {
      type: String,
    },
    TotalRunningTime: {
      type: String,
    },
    TotalSessionCount: {
      type: String,
    },
    TotalSessionCorrectlyEnded: {
      type: String,
    },
    TotalSessionEndedBeforeTime: {
      type: String,
    },
    TotalSessionNotEndedCorrectly: {
      type: String,
    },
    StartSession: {
      type: String,
    },
    EndSession: {
      type: String,
    },
    EndSessionType: {
      type: String,
    },
    Temperature: {
      type: String,
    },
    AnemometerSensor: {
      type: String,
    },
    PresencePhases: {
      type: String,
    },
    SensorFilters: {
      type: String,
    },
    LampMaintenance: {
      type: String,
    },
    AnnualMaintenance: {
      type: String,
    },
    ActualLastTemp: {
      type: String,
    },
    HighestTemp: {
      type: String,
    },
    PowerFactorCorrection: {
      type: String,
    },
    PFDeviationFromOptimalLevel: {
      type: String,
    },
    LastFanSpeed: {
      type: String,
    },
    InputVoltage: {
      type: String,
    },
    Transmission: {
      type: String,
    },
    Message: {
      type: String,
    },
  },
  { timestamps: true }
);
let mqttMessageModel = new mongoose.model("Mqttmessage", mqttMessageSchema);

module.exports = mqttMessageModel;
