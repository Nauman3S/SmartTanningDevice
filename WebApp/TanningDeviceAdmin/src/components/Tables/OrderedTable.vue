<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.ID }}</md-table-cell>
        <md-table-cell md-label="Timestamp(LastUpdated)">{{
          item.Timestamp
        }}</md-table-cell>
        <md-table-cell md-label="MachineSerialNumber"
          ><md-field @mouseover="hover = true" @mouseout="hover = false">
            <label>Click to Update SerialNumber</label>
            <md-input v-model="item.MachineSerialNumber"></md-input> </md-field
        ></md-table-cell>
        <md-table-cell md-label="MachineType">
          <md-field @mouseover="hover = true" @mouseout="hover = false">
            <label>Click to Update MachineType</label>
            <md-input v-model="item.MachineType"></md-input>
          </md-field>
        </md-table-cell>
        <md-table-cell md-label="DeviceMAC">{{ item.DeviceMAC }}</md-table-cell>
        <md-table-cell md-label="Alive(Online)">{{ item.Alive }}</md-table-cell>
        <md-table-cell md-label="TotalRunningTime">{{
          item.TotalRunningTime
        }}</md-table-cell>
        <md-table-cell md-label="TotalSessionCount">{{
          item.TotalSessionCount
        }}</md-table-cell>
        <md-table-cell md-label="TotalSessionCorrectlyEnded">{{
          item.TotalSessionCorrectlyEnded
        }}</md-table-cell>
        <md-table-cell md-label="TotalSessionEndedBeforeTime">{{
          item.TotalSessionEndedBeforeTime
        }}</md-table-cell>
        <md-table-cell md-label="TotalSessionNotEndedCorrectly">{{
          item.TotalSessionNotEndedCorrectly
        }}</md-table-cell>

        <md-table-cell md-label="StartSession">{{
          item.StartSession
        }}</md-table-cell>
        <md-table-cell md-label="EndSession">
          {{ item.EndSession }}
        </md-table-cell>
        <md-table-cell md-label="EndSessionType">{{
          item.EndSessionType
        }}</md-table-cell>
        <md-table-cell md-label="Temperature">{{
          item.Temperature
        }}</md-table-cell>
        <md-table-cell md-label="AnemometerSensor">{{
          item.AnemometerSensor
        }}</md-table-cell>

        <md-table-cell md-label="PresencePhases">{{
          item.PresencePhases
        }}</md-table-cell>
        <md-table-cell md-label="SensorFilters"
          ><div
            v-bind:style="
              item.SensorFilters == 'OK' ? myStyleGreen : myStyleRed
            "
            id="wrapper"
          >
            {{ item.SensorFilters }}
          </div></md-table-cell
        >
        <md-table-cell md-label="LampMaintenance">
          <div
            v-bind:style="
              item.LampMaintenance == 'OK' ? myStyleGreen : myStyleRed
            "
            id="wrapper"
          >
            {{ item.LampMaintenance }}
          </div></md-table-cell
        >
        <md-table-cell md-label="AnnualMaintenance"
          ><div
            v-bind:style="
              item.AnnualMaintenance == 'OK' ? myStyleGreen : myStyleRed
            "
            id="wrapper"
          >
            {{ item.AnnualMaintenance }}
          </div></md-table-cell
        >
        <md-table-cell md-label="ActualLastTemp">{{
          item.ActualLastTemp
        }}</md-table-cell>
        <md-table-cell md-label="HighestTemp">{{
          item.HighestTemp
        }}</md-table-cell>
        <md-table-cell md-label="PowerFactorCorrection">{{
          item.PowerFactorCorrection
        }}</md-table-cell>
        <md-table-cell md-label="CorrectPF"
          ><md-field @mouseover="hover = true" @mouseout="hover = false">
            <label>Click to Update PF</label>
            <md-input v-model="item.CorrectPF"></md-input> </md-field
        ></md-table-cell>
        <md-table-cell md-label="PFDeviationFromOptimalLevel">{{
          item.PowerFactorCorrection - item.CorrectPF
        }}</md-table-cell>
        <md-table-cell md-label="LastFanSpeed">{{
          item.LastFanSpeed
        }}</md-table-cell>
        <md-table-cell md-label="InputVoltage">{{
          item.InputVoltage
        }}</md-table-cell>

        <md-table-cell md-label="Poll"
          ><md-button
            @mouseover="hover = true"
            @mouseout="hover = true"
            @click.native="
              pollMachine(
                item.DeviceMAC,
                item.MachineType,
                item.MachineSerialNumber
              )
            "
            class="md-primary"
            >Poll</md-button
          ></md-table-cell
        >
        <md-table-cell md-label="Transmission">{{
          item.Transmission
        }}</md-table-cell>
        <md-table-cell md-label="Message">{{ item.Message }}</md-table-cell>
        <md-table-cell md-label="PaymentSystem">
          <md-autocomplete v-model="item.PaymentSystem" :md-options="PaymentSystemOptions">
            <label>PaymentSystem</label>
          </md-autocomplete>
        </md-table-cell>
        <md-table-cell md-label="InstallDate">
          <md-field @mouseover="hover = true" @mouseout="hover = false">
            <label>Click to Update Date</label>
            <md-input v-model="item.InstallDate"></md-input>
          </md-field>
        </md-table-cell>

        <md-table-cell md-label="Transmit"
          ><md-button
            @mouseover="hover = true"
            @mouseout="hover = true"
            @click.native="
              transmitData(
                item.DeviceMAC,
                item.MachineType,
                item.InstallDate,
                item.CorrectPF,
                item.MachineSerialNumber,
                item.Message,
                item.PaymentSystem
              )
            "
            class="md-primary"
            >Transmit</md-button
          ></md-table-cell
        >
      </md-table-row>
    </md-table>

    <!-- <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.ID }}</md-table-cell>
        <md-table-cell md-label="Timestamp">{{ item.Timestamp }}</md-table-cell>
        <md-table-cell md-label="DeviceMAC">{{ item.DeviceMAC }}</md-table-cell>
        <md-table-cell md-label="Temperature">{{
          item.Temperature
        }}</md-table-cell>
        <md-table-cell md-label="AnemometerSensor">{{
          item.AnemometerSensor
        }}</md-table-cell>
        <md-table-cell md-label="InputVoltage">{{
          item.InputVoltage
        }}</md-table-cell>
        <md-table-cell md-label="PresencePhases">{{
          item.PresencePhases
        }}</md-table-cell>
      </md-table-row>
    </md-table> -->
    <!-- 
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.ID }}</md-table-cell>
        <md-table-cell md-label="Timestamp">{{ item.Timestamp }}</md-table-cell>
        <md-table-cell md-label="DeviceMAC">{{ item.DeviceMAC }}</md-table-cell>
        <md-table-cell md-label="SensorFilters">{{
          item.SensorFilters
        }}</md-table-cell>
        <md-table-cell md-label="LampMaintenance">{{
          item.LampMaintenance
        }}</md-table-cell>
        <md-table-cell md-label="AnnualMaintenance">{{
          item.AnnualMaintenance
        }}</md-table-cell>
        <md-table-cell md-label="PowerFactorCorrection">{{
          item.PowerFactorCorrection
        }}</md-table-cell>
      </md-table-row>
    </md-table> -->
  </div>
</template>

<script>
const API_URL_LedgerLog = "http://34.214.65.82:8080/v1/getLogs";
const API_LIST_MAC = "http://34.214.65.82:8080/v1/listAllUniqueSettings";
const API_DEV_UPDATE = "http://34.214.65.82:8080/v1/updateDeviceSettings";
const toLower = (text) => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter((item) =>
      toLower(item.DeviceMAC).includes(toLower(term))
    );
  }

  return items;
};
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: [],
      SelectedPaymentSystemV: null,
      PaymentSystemOptions:[
        'STD',
        'CARD',
        'TOKEN',
        'EXT'
      ],

      allData: [],

      macsAddresses: [],
      myStyleGreen: {
        backgroundColor: "#16a085",
        padding: 0,
        margin: 0,
        width: 100,
      },
      myStyleRed: {
        backgroundColor: "#9e1a1a",
        padding: 0,
        margin: 0,
        width: 100,
      },
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false,
      },
      hover: false,
      selected: [],
      macs: [],
      users: [
        {
          id: 1,
          name: "D1akota Rice",
          salary: "$36,738",
          country: "Niger",
          city: "Oud-Turnhout",
        },
        {
          id: 2,
          name: "Minerva Hooper",
          salary: "$23,738",
          country: "Curaçao",
          city: "Sinaai-Waas",
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          salary: "$56,142",
          country: "Netherlands",
          city: "Overland Park",
        },
        {
          id: 4,
          name: "Philip Chaney",
          salary: "$38,735",
          country: "Korea, South",
          city: "Gloucester",
        },
      ],
    };
  },

  methods: {
    notifyM(verticalAlign, horizontalAlign, clr, title, msg) {
      var color = clr; //Math.floor(Math.random() * 4 + 1);
      this.$notify({
        message: "<b>" + title + "</b><br>" + msg,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color],
      });
    },
    pollMachine(mac, type, serialN) {
      console.log("Polling", mac, " ", type, " ", serialN);
    },
    transmitData(
      DeviceMACv,
      MachineTypev,
      InstallDatev,
      CorrectPFv,
      machineSerial,
      message,
      paymentSys
    ) {
      console.log(
        DeviceMACv,
        MachineTypev,
        InstallDatev,
        CorrectPFv,
        machineSerial,
        message,
        paymentSys
      );
      console.log("Device Update");
      //this.$sidebar.displaySidebar(false);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({
          DeviceMAC: DeviceMACv,
          MachineType: MachineTypev,
          InstallDate: InstallDatev,
          CorrectPF: CorrectPFv,
          MachineSerialNumber: machineSerial,
          Message: message,
          PaymentSystem: paymentSys,
        }),
      };
      fetch(API_DEV_UPDATE, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result.data);

          if (result.status == 200) {
            this.notifyM(
              "top",
              "right",
              2,
              "Login",
              "Data transmitted to " + DeviceMACv + " successfully."
            );
          } else {
            this.notifyM(
              "top",
              "right",
              4,
              "Error",
              "Error while transmitting"
            );
          }
        }); //data => (this.postId = data.id)

      // this.notifyM("top","right",2,'Registraion','Registraion successful.')
      // this.$router.push({ path: 'main'})

      //   this.$store.state.loggedInUser=this.emailAd;
      //   console.log(this.$store.state.loggedInUser)
      //   this.$router.push({ path: 'dashboard'})
    },
    transmit(dm, mt, id, cp, ms, msg, ps) {
      console.log("transmitting", dm);
      transmitData(dm, mt, id, cp, ms, msg, ps);
    },
    getData() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "",
      };

      fetch(API_URL_LedgerLog, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result.data)
          this.allData = result["data"];

          this.users = this.allData;
          this.$store.state.logsData = this.users;
          var i = 0;
          var macsList = [];

          for (i = 0; i < this.users.length; i++) {
            var g = this.users[i]["DeviceMAC"];

            if (g != "NaN") {
              macsList.push(g);
            }
          }
          this.macsAddresses = macsList;

          var uniqueDevices = new Set(macsList).size;

          this.$store.state.totalDevices = uniqueDevices;
          this.$store.state.totalLogs = this.users.length;
        });
    },
  },

  mounted() {
    this.$nextTick(function () {
      window.setInterval(() => {
        this.getData();
      }, 4000);
    });
    // this.getData()
  },
};
</script>
