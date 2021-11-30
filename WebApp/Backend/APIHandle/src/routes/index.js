import express from 'express';
import { indexPage, tempHandlePage } from '../controllers';

import mysql from 'mysql'
//import helmet from 'helmet'
//import 'axios'
//import MqttHandler from './mqtt_handler'
import mqtt from 'mqtt';
import cors from 'cors';
//import axios from 'axios';

// const app=express();
// app.use(helmet())
// app.use(helmet.permittedCrossDomainPolicies({
//       permittedPolicies : "all",

// }));
// app.use(cors({credentials:true , origin:true}))
// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

// })
const indexRouter = express.Router();
//const indexRouter = app;
const cashHandleRouter = express.Router();
//indexRouter.locals.axios=axios;
//axios.defaults.headers.common['Access-Control-Allow-Origin']='*';
// indexRouter.use(cors());

//   indexRouter.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin",'*');
//     res.header("Access-Control-Allow-Headers",'Origin, X-Requested-With, Content-Type, Accept');

// })
//const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://34.214.65.82')

var garageState = ''
var connected = false


////////////////////////////////////////////*** */

//new cols in vledger InstallDate,CorrectPF,MachineType

/////////////////////////////////////////*** **/////



client.on('connect', () => {
  client.subscribe('tanning-device/createNew')
  client.subscribe('tanning-device/updateDevice')
  client.subscribe('tanning-device/deviceExists')
  client.subscribe('tanning-device/updateStartSession')
  client.subscribe('tanning-device/updateStopSession')
  client.subscribe('tanning-device/updateTemp')
  client.subscribe('tanning-device/updateFilter')
  client.subscribe('tanning-device/updateLamp')
  client.subscribe('tanning-device/updateYear')
  client.subscribe('tanning-device/updateAmp')
  client.subscribe('tanning-device/updateVent')
  client.subscribe('tanning-device/updateVolt')
  client.subscribe('tanning-device/updateRst')
})


var db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'gh-mysqldb',
  database: 'tanningdevice',
  multipleStatements: true
})
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});



indexRouter.get('/', cors(), indexPage);
indexRouter.get('/temp', cors(), tempHandlePage);

indexRouter.post('/getLogs', cors(), function (req, res) {
  let sql = `SELECT * FROM VLedger`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Logs"
    })
  })
});

indexRouter.post('/verifyFingerPrint', cors(), function (req, res) {
  let sql = `SELECT * FROM VLedger WHERE Fingerprint='` + req.body.Fingerprint + `'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Verification"
    })
  })
});
indexRouter.post('/newFingerPrint', cors(), function (req, res) {
  let sql = `INSERT INTO VLedger(Fingerprint, LastVend, MachineNumber, TotalVends) VALUES (?)`;
  let values = [
    req.body.Fingerprint,
    req.body.LastVend,
    req.body.MachineNumber,
    '0'


  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New fingerprint added successfully"
    })
  })
  client.publish('vend-machine/vend', values[2])
});

//UPDATE Users SET Credits=(CreditsRequest+Credits), CreditsRequest='0' WHERE Email='n@n.com'

indexRouter.post('/vend', cors(), function (req, res) {
  //console.log(req);
  let values = [

    req.body.Fingerprint,
    req.body.LastVend,
    req.body.MachineNumber



  ];
  let sql = `UPDATE VLedger SET LastVend='` + values[1] + `' ,MachineNumber='` + values[2] + `' , TotalVends=(TotalVends+1) WHERE Fingerprint='` + values[0] + `'`;

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "vending initiated"
    })
  })
  client.publish('vend-machine/vend', values[2])
});

indexRouter.post('/credReq', cors(), function (req, res) {
  //console.log(req);
  let values = [

    req.body.CreditsRequest,
    req.body.Email,


  ];
  let sql = `UPDATE Users SET CreditsRequest='` + values[0] + `' WHERE Email='` + values[1] + `'`;

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    })
  })
});

indexRouter.get('/rewardEqCredits', cors(), function (req, res) {

  let sql = `SELECT RewardEqCredits FROM Admin`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});


indexRouter.post('/rewardToCred', cors(), function (req, res) {
  //console.log(req);
  let values = [

    req.body.RewardPoints,
    req.body.Credits,
    req.body.Email

  ];
  let sql = `UPDATE Users SET RewardPoints='` + values[0] + `' ,Credits='` + values[1] + `' WHERE Email='` + values[2] + `'`;

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    })
  })
});



//On new jobs//
indexRouter.post('/rewardCredsUpdate', cors(), function (req, res) {
  //console.log(req);
  let values = [

    req.body.RewardPoints,
    req.body.Credits,
    req.body.Email,


  ];
  let sql = `UPDATE Users SET RewardPoints='` + values[0] + `' ,Credits='` + values[1] + `' WHERE Email='` + values[2] + `'`;

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    })
  })
});
indexRouter.post('/getUserLedger', cors(), function (req, res) {
  let sql = `SELECT * FROM Ledger WHERE Email='` + req.body.email + `'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

indexRouter.post('/ledgerUpdate', cors(), function (req, res) {
  let sql = `INSERT INTO Ledger( FileName, JobType, CreditsUsed, RewardPointsEarned, Email) VALUES (?)`;
  let values = [

    req.body.FileName,
    req.body.JobType,
    req.body.CreditsUsed,
    req.body.RewardPointsEarned,
    req.body.Email,


  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New player added successfully"
    })
    client.publish('bkc-device/printer', JSON.stringify(values));
  })
});
//////////////////////////ADMIN
indexRouter.post('/loginAdmin', cors(), function (req, res) {
  let sql = `SELECT * FROM Admin WHERE Email='` + req.body.email + `' AND Password='` + req.body.password + `'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

indexRouter.post('/updateAdmin', cors(), function (req, res) {
  //console.log(req);
  let values = [

    req.body.FName,
    req.body.LName,
    req.body.Email,
    req.body.Password


  ];
  let sql = `UPDATE Admin SET FName='` + values[0] + `', LName='` + values[1] + `', Email='` + values[2] + `', Password='` + values[3] + `' WHERE ID=1`;

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    })
  })
});


indexRouter.post('/updateAdminRewVal', cors(), function (req, res) {
  //console.log(req);
  let values = [

    req.body.RewardEqCredits


  ];
  let sql = `UPDATE Admin SET RewardEqCredits='` + values[0] + `'`;

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "User Updated"
    })
  })
});

indexRouter.post('/allCredReqs', cors(), function (req, res) {
  let sql = `SELECT * FROM Users WHERE CreditsRequest>0`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

indexRouter.post('/ledgerLog', cors(), function (req, res) {
  let sql = `SELECT * FROM VLedger `;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

indexRouter.post('/jobOperations', cors(), function (req, res) {
  if (req.body.operation == 'cancel') {
    client.publish("bkc-device/allJobsOperation", "cancel")
    res.json({
      status: 200,

      message: "Jobs canceled successfully"
    })
  }
  else if (req.body.operation == 'restore') {
    client.publish("bkc-device/allJobsOperation", "restore")
    res.json({
      status: 200,

      message: "Jobs restored successfully"
    })
  }


});
//UPDATE Users SET Credits=(CreditsRequest+Credits), CreditsRequest='0' WHERE Email='n@n.com'




indexRouter.get('/listAll', cors(), function (req, res) {

  let sql = `SELECT * FROM Admin`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});


indexRouter.post('/listAllUniqueMAC', cors(), function (req, res) {

  let sql = `SELECT DISTINCT DeviceMAC from VLedger;`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

indexRouter.post('/listAllUniqueSettings', cors(), function (req, res) {

  let sql = `SELECT DISTINCT DeviceMAC,MachineType,InstallDate,CorrectPF from VLedger;`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});


indexRouter.post('/updateMachineType', cors(), function (req, res) {
  //console.log(req);
  let values = [

    req.body.MachineType,
    req.body.DeviceMAC


  ];
  let sql = `UPDATE VLedger SET MachineType='` + values[0] +  `' WHERE DeviceMAC='` + values[1] + `'`;

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "Machine type Updated"
    })
  })
});

indexRouter.post('/updateDeviceSettings', cors(), function (req, res) {
  //console.log(req);
  let values = [

    req.body.MachineType,
    req.body.InstallDate,
    req.body.CorrectPF,
    req.body.DeviceMAC


  ];
  let sql = `UPDATE VLedger SET MachineType='` + values[0] + `', InstallDate='` + values[1] + `', CorrectPF='` + values[2] +  `' WHERE DeviceMAC='` + values[3] + `'`;

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "Machine type Updated"
    })
  })
});

indexRouter.post('/updateInstallDate', cors(), function (req, res) {
  //console.log(req);
  let values = [

    req.body.InstallData,
    req.body.DeviceMAC


  ];
  let sql = `UPDATE VLedger SET InstallDate='` + values[0] +  `' WHERE DeviceMAC='` + values[1] + `'`;

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "Machine install date Updated"
    })
  })
});


indexRouter.post('/updateCorrectPF', cors(), function (req, res) {
  //console.log(req);
  let values = [

    req.body.CorrectPF,
    req.body.DeviceMAC


  ];
  let sql = `UPDATE VLedger SET CorrectPF='` + values[0] +  `' WHERE DeviceMAC='` + values[1] + `'`;

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "Machine CorrectPF Updated"
    })
  })
});


indexRouter.get('/getActive', cors(), function (req, res) {
  let sql = `SELECT * FROM data WHERE ActiveStatus='1'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

indexRouter.get('/getUser', cors(), function (req, res) {
  let sql = `SELECT * FROM Admin`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});



indexRouter.post('/addNewDevice', cors(), function (req, res) {
  let sql = `INSERT INTO VLedger(DeviceMAC, StartSession, EndSession, EndSessionType, Temperature, SensorFilters, LampMaintenance, AnnualMaintenance, PowerFactorCorrection, AnemometerSensor, InputVoltage, PresencePhases, Timestamp) VALUES (?)`;
  let values = [
    DeviceMAC, StartSession, EndSession, EndSessionType, Temperature, SensorFilters, LampMaintenance, AnnualMaintenance, PowerFactorCorrection, AnemometerSensor, InputVoltage, PresencePhases, Timestamp

  ];
  db.query(sql, [values],
    function (err, rows) {
      if (rows === undefined) {
        reject(new Error("Error rows is undefined"));
      } else {
        resolve(rows);
      }
    }
  )


});

var filesList = "";

client.on('message', (topic, message) => {
  switch (topic) {
    case 'bkc-device/filesList':
      filesList = message.toString();
      console.log(filesList)


      break;
    case 'edc-monitor/setActive':
      //handlesetActive(message.toString()).then(function(results1){var m=results1[0]}).catch(function(err){console.log('err',err)});    
      handleDeactivateAll()
        .then(function (results) {
          /// var strData=JSON.stringify(results[0])
          // client.publish('edc-monitor/activePlayer', strData)
          // handlesetActive(message).then(function(results){var m=""}).catch(function(err){console.log(err)});
          handlesetActive(message.toString()).then(function (results1) { var m = "" }).catch(function (err) { console.log(err) });
        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })
      break;
    // client.publish('garage/close', 'Closing;'+message)
    // return handleGarageState(message)
    case 'tanning-device/deviceExists':
      doesDeviceExists(message.toString())
        .then(function (results) {
          var strData = JSON.stringify(results[0])
          /// var strData=JSON.stringify(results[0])
          if (typeof strData == 'undefined') {
            client.publish('tanning-device/deviceExistance', 'null')
          }
          else {
            client.publish('tanning-device/deviceExistance', strData)
          }
          // client.publish('edc-monitor/activePlayer', strData)
          // handlesetActive(message).then(function(results){var m=""}).catch(function(err){console.log(err)});
          //handlesetActive(message.toString()).then(function(results1){var m=""}).catch(function(err){console.log(err)});  
        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })
      break;

    case 'tanning-device/createNew':
      var dataD = message.toString()
      console.log(dataD)
      var DataG = dataD.split(';')

      handleCreateNew(DataG[0], DataG[1], DataG[2], DataG[3], DataG[4], DataG[5], DataG[6], DataG[7], DataG[8], DataG[9], DataG[10], DataG[11], (new Date().toISOString()))
        .then(function (results) {
          var strData = JSON.stringify(results[0])
          //client.publish('edc-monitor/activePlayer', strData)

        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })
      break;

    case 'tanning-device/updateDevice':
      var dataD = message.toString()
      console.log(dataD)
      var DataG = dataD.split(';')
      handleUpdateDevice(DataG[0], DataG[1], DataG[2], DataG[3], DataG[4], DataG[5], DataG[6], DataG[7], DataG[8], DataG[9], DataG[10], DataG[11], (new Date().toISOString()))
        .then(function (results) {
          var strData = JSON.stringify(results[0])
          //client.publish('edc-monitor/activePlayer', strData)

        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })
      break;


    case 'tanning-device/updateStartSession':
      var dataD = message.toString()
      console.log(dataD)
      var DataG = dataD.split(';')
      handleUpdateDevice_StartSession(DataG[0], DataG[1], (new Date().toISOString()))
        .then(function (results) {
          var strData = JSON.stringify(results[0])
          //client.publish('edc-monitor/activePlayer', strData)

        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })
      break;

    case 'tanning-device/updateStopSession':
      var dataD = message.toString()
      console.log(dataD)
      var DataG = dataD.split(';')
      handleUpdateDevice_StopSession(DataG[0], DataG[1], (new Date().toISOString()))
        .then(function (results) {
          var strData = JSON.stringify(results[0])
          //client.publish('edc-monitor/activePlayer', strData)

        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })
      break;

    case 'tanning-device/updateTemp':
      var dataD = message.toString()
      console.log(dataD)
      var DataG = dataD.split(';')
      handleUpdateDevice_Temp(DataG[0], DataG[1], (new Date().toISOString()))
        .then(function (results) {
          var strData = JSON.stringify(results[0])
          //client.publish('edc-monitor/activePlayer', strData)

        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })
      break;
    case 'tanning-device/updateFilter':
      var dataD = message.toString()
      console.log(dataD)
      var DataG = dataD.split(';')
      handleUpdateDevice_Filter(DataG[0], DataG[1], (new Date().toISOString()))
        .then(function (results) {
          var strData = JSON.stringify(results[0])
          //client.publish('edc-monitor/activePlayer', strData)

        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })
      break;
    case 'tanning-device/updateLamp':
      var dataD = message.toString()
      console.log(dataD)
      var DataG = dataD.split(';')
      handleUpdateDevice_LampMaintenance(DataG[0], DataG[1], (new Date().toISOString()))
        .then(function (results) {
          var strData = JSON.stringify(results[0])
          //client.publish('edc-monitor/activePlayer', strData)

        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })
      break;

    case 'tanning-device/updateYear':
      var dataD = message.toString()
      console.log(dataD)
      var DataG = dataD.split(';')
      handleUpdateDevice_AnnualMaintenance(DataG[0], DataG[1], (new Date().toISOString()))
        .then(function (results) {
          var strData = JSON.stringify(results[0])
          //client.publish('edc-monitor/activePlayer', strData)

        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })
      break;
    case 'tanning-device/updateAmp':
      var dataD = message.toString()
      console.log(dataD)
      var DataG = dataD.split(';')
      handleUpdateDevice_PowerFactorCorrection(DataG[0], DataG[1], (new Date().toISOString()))
        .then(function (results) {
          var strData = JSON.stringify(results[0])
          //client.publish('edc-monitor/activePlayer', strData)

        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })
      break;

    case 'tanning-device/updateVent':
      var dataD = message.toString()
      console.log(dataD)
      var DataG = dataD.split(';')
      handleUpdateDevice_AnemometerSensor(DataG[0], DataG[1], (new Date().toISOString()))
        .then(function (results) {
          var strData = JSON.stringify(results[0])
          //client.publish('edc-monitor/activePlayer', strData)

        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })
      break;

    case 'tanning-device/updateVolt':
      var dataD = message.toString()
      console.log(dataD)
      var DataG = dataD.split(';')
      handleUpdateDevice_InputVoltage(DataG[0], DataG[1], (new Date().toISOString()))
        .then(function (results) {
          var strData = JSON.stringify(results[0])
          //client.publish('edc-monitor/activePlayer', strData)

        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })
      break;

    case 'tanning-device/updateRst':
      var dataD = message.toString()
      console.log(dataD)
      var DataG = dataD.split(';')
      handleUpdateDevice_PresencePhases(DataG[0], DataG[1], (new Date().toISOString()))
        .then(function (results) {
          var strData = JSON.stringify(results[0])
          //client.publish('edc-monitor/activePlayer', strData)

        })
        .catch(function (err) {
          console.log("Promise rejection error: " + err);
        })
      break;



  }
  //console.log('No handler for topic %s', topic)
})
//import async from 'async';
function handlegetActive() {
  return new Promise(function (resolve, reject) {
    db.query(
      `SELECT * FROM data WHERE ActiveStatus='1'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}


function doesDeviceExists(DeviceMAC) {
  return new Promise(function (resolve, reject) {
    db.query(
      `SELECT * FROM VLedger WHERE DeviceMAC='` + DeviceMAC + `'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}

function handleDeactivateAll() {
  return new Promise(function (resolve, reject) {
    db.query(
      `UPDATE data SET ActiveStatus='0'`,
      function (err, rows) {
        resolve(rows);
        // if(rows === undefined){
        //     reject(new Error("Error rows is undefined"));
        // }else{
        //     resolve(rows);
        // }
      }
    )
  }
  )
}
function handlesetActive(playerID) {
  return new Promise(function (resolve, reject) {
    db.query(
      `UPDATE data SET ActiveStatus='0' ; UPDATE data SET ActiveStatus='1' WHERE PlayerID='` + playerID + `'`,
      function (err, rows) {
        resolve(rows);
        // if(rows === undefined){
        //     reject(new Error("Error rows is undefined"));
        // }else{
        //     resolve(rows);
        // }
      }
    )
  }
  )
}

function handleCreateNew(DeviceMAC, StartSession, EndSession, EndSessionType, Temperature, SensorFilters, LampMaintenance, AnnualMaintenance, PowerFactorCorrection, AnemometerSensor, InputVoltage, PresencePhases, Timestamp) {
  return new Promise(function (resolve, reject) {
    let sql = `INSERT INTO VLedger(DeviceMAC, StartSession, EndSession, EndSessionType, Temperature, SensorFilters, LampMaintenance, AnnualMaintenance, PowerFactorCorrection, AnemometerSensor, InputVoltage, PresencePhases, Timestamp) VALUES (?)`;
    let values = [
      DeviceMAC, StartSession, EndSession, EndSessionType, Temperature, SensorFilters, LampMaintenance, AnnualMaintenance, PowerFactorCorrection, AnemometerSensor, InputVoltage, PresencePhases, Timestamp

    ];
    db.query(sql, [values],
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}

function handleUpdateDevice(DeviceMAC, StartSession, EndSession, EndSessionType, Temperature, SensorFilters, LampMaintenance, AnnualMaintenance, PowerFactorCorrection, AnemometerSensor, InputVoltage, PresencePhases, Timestamp) {
  return new Promise(function (resolve, reject) {

    db.query(
      `UPDATE VLedger SET Timestamp='` + Timestamp + `', StartSession='` + StartSession + `', EndSession='` + EndSession + `', EndSessionType='` + EndSessionType + `', Temperature='` + Temperature + `', SensorFilters='` + SensorFilters + `', LampMaintenance='` + LampMaintenance + `', AnnualMaintenance='` + AnnualMaintenance + `', PowerFactorCorrection='` + PowerFactorCorrection + `', AnemometerSensor='` + AnemometerSensor + `', InputVoltage='` + InputVoltage + `', PresencePhases='` + PresencePhases + `' WHERE DeviceMAC='` + DeviceMAC + `'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}


function handleUpdateDevice_StartSession(DeviceMAC, StartSession, Timestamp) {
  return new Promise(function (resolve, reject) {

    db.query(
      `UPDATE VLedger SET Timestamp='` + Timestamp + `', StartSession='` + StartSession + `' WHERE DeviceMAC='` + DeviceMAC + `'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}

function handleUpdateDevice_StopSession(DeviceMAC, EndSession, Timestamp) {
  return new Promise(function (resolve, reject) {

    db.query(
      `UPDATE VLedger SET Timestamp='` + Timestamp + `', EndSession='` + EndSession + `' WHERE DeviceMAC='` + DeviceMAC + `'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}

function handleUpdateDevice_Temp(DeviceMAC, Temperature, Timestamp) {
  return new Promise(function (resolve, reject) {

    db.query(
      `UPDATE VLedger SET Timestamp='` + Timestamp + `', Temperature='` + Temperature + `' WHERE DeviceMAC='` + DeviceMAC + `'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}

function handleUpdateDevice_Filter(DeviceMAC, SensorFilters, Timestamp) {
  return new Promise(function (resolve, reject) {

    db.query(
      `UPDATE VLedger SET Timestamp='` + Timestamp + `', SensorFilters='` + SensorFilters + `' WHERE DeviceMAC='` + DeviceMAC + `'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}

function handleUpdateDevice_LampMaintenance(DeviceMAC, LampMaintenance, Timestamp) {
  return new Promise(function (resolve, reject) {

    db.query(
      `UPDATE VLedger SET Timestamp='` + Timestamp + `', LampMaintenance='` + LampMaintenance + `' WHERE DeviceMAC='` + DeviceMAC + `'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}


function handleUpdateDevice_AnnualMaintenance(DeviceMAC, AnnualMaintenance, Timestamp) {
  return new Promise(function (resolve, reject) {

    db.query(
      `UPDATE VLedger SET Timestamp='` + Timestamp + `', AnnualMaintenance='` + AnnualMaintenance + `' WHERE DeviceMAC='` + DeviceMAC + `'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}
function handleUpdateDevice_PowerFactorCorrection(DeviceMAC, PowerFactorCorrection, Timestamp) {
  return new Promise(function (resolve, reject) {

    db.query(
      `UPDATE VLedger SET Timestamp='` + Timestamp + `', PowerFactorCorrection='` + PowerFactorCorrection + `' WHERE DeviceMAC='` + DeviceMAC + `'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}

function handleUpdateDevice_AnemometerSensor(DeviceMAC, AnemometerSensor, Timestamp) {
  return new Promise(function (resolve, reject) {

    db.query(
      `UPDATE VLedger SET Timestamp='` + Timestamp + `', AnemometerSensor='` + AnemometerSensor + `' WHERE DeviceMAC='` + DeviceMAC + `'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}

function handleUpdateDevice_InputVoltage(DeviceMAC, InputVoltage, Timestamp) {
  return new Promise(function (resolve, reject) {

    db.query(
      `UPDATE VLedger SET Timestamp='` + Timestamp + `', InputVoltage='` + InputVoltage + `' WHERE DeviceMAC='` + DeviceMAC + `'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}

function handleUpdateDevice_PresencePhases(DeviceMAC, PresencePhases, Timestamp) {
  return new Promise(function (resolve, reject) {

    db.query(
      `UPDATE VLedger SET Timestamp='` + Timestamp + `', PresencePhases='` + PresencePhases + `' WHERE DeviceMAC='` + DeviceMAC + `'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    )
  }
  )
}



indexRouter.post('/filesList', cors(), function (req, res) {



  let sql = `SELECT * FROM Users WHERE Email='` + req.body.email + `'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      filesList,
      message: "User lists retrieved successfully"
    })
  })
});

export default indexRouter;
//export default cashHandleRouter;