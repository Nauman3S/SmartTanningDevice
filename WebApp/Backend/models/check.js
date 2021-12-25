const mongoose = require("mongoose");
let checkSchema = mongoose.Schema({
  // arr: [
  //   {
  //     key: { type: String, defaultValue: "Timestamp" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "MachineSerialNumber" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "MachineType" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "macAddress" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "Alive" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "TotalRunningTime" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "TotalSessionCorrectlyEnded" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "TotalSessionEndedBeforeTime" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "StartSession" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "EndSession" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "EndSessionType" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "Temperature" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "AnemometerSensor" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "PresencePhases" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "SensorFilters" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "LampMaintenance" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "AnnualMaintenance" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "ActualLastTemp" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "HighestTemp" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "PowerFactorCorrection" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "CorrectPF" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "PFDeviationFromOptimalLevel" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "LastFanSpeed" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "InputVoltage" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "Poll" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "Message" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "PaymentSystem" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "InstallDate" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  //   {
  //     key: { type: String, defaultValue: "Transmit" },
  //     bol: { type: String, defaultValue: "false" },
  //   },
  // ],
  macAddress: {
    type: Boolean,
    default: false,
  },

  Alive: {
    type: Boolean,
    default: false,
  },
  TotalRunningTime: {
    type: Boolean,
    default: false,
  },
  TotalSessionCount: {
    type: Boolean,
    default: false,
  },
  TotalSessionCorrectlyEnded: {
    type: Boolean,
    default: false,
  },
  TotalSessionEndedBeforeTime: {
    type: Boolean,
    default: false,
  },

  StartSession: {
    type: Boolean,
    default: false,
  },
  EndSession: {
    type: Boolean,
    default: false,
  },
  EndSessionType: {
    type: Boolean,
    default: false,
  },
  Temperature: {
    type: Boolean,
    default: false,
  },
  AnemometerSensor: {
    type: Boolean,
    default: false,
  },
  PresencePhases: {
    type: Boolean,
    default: false,
  },
  SensorFilters: {
    type: Boolean,
    default: false,
  },
  LampMaintenance: {
    type: Boolean,
    default: false,
  },
  AnnualMaintenance: {
    type: Boolean,
    default: false,
  },
  ActualLastTemp: {
    type: Boolean,
    default: false,
  },
  HighestTemp: {
    type: Boolean,
    default: false,
  },
  PowerFactorCorrection: {
    type: Boolean,
    default: false,
  },
  PFDeviationFromOptimalLevel: {
    type: Boolean,
    default: false,
  },
  LastFanSpeed: {
    type: Boolean,
    default: false,
  },
  InputVoltage: {
    type: Boolean,
    default: false,
  },
  Message: {
    type: Boolean,
    default: false,
  },
  MachineSerialNumber: {
    type: Boolean,
    default: false,
  },
  MachineType: {
    type: Boolean,
    default: false,
  },
  CorrectPF: {
    type: Boolean,
    default: false,
  },
  PaymentSystem: {
    type: Boolean,
    default: false,
  },
  InstallDate: {
    type: Boolean,
    default: false,
  },
  Transmit: {
    type: Boolean,
    default: false,
  },
  Poll: {
    type: Boolean,
    default: false,
  },
  Timestamp: {
    type: Boolean,
    default: false,
  },
});
let checkModel = new mongoose.model("check", checkSchema);

module.exports = checkModel;
