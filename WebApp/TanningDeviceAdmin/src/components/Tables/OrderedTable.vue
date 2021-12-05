<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.ID }}</md-table-cell>
        <md-table-cell md-label="Timestamp">{{ item.Timestamp }}</md-table-cell>
        <md-table-cell md-label="DeviceMAC">{{ item.DeviceMAC }}</md-table-cell>
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
        <md-table-cell md-label="InputVoltage">{{
          item.InputVoltage
        }}</md-table-cell>
        <md-table-cell md-label="PresencePhases">{{
          item.PresencePhases
        }}</md-table-cell>
        <md-table-cell md-label="SensorFilters">{{
          item.SensorFilters
        }}</md-table-cell>
        <md-table-cell md-label="LampMaintenance">
          <div :style="item.LampMaintenance==1 ? {myStyleGreen}:{myStyleRed}" id="wrapper">
            {{ item.LampMaintenance }}
          </div></md-table-cell
        >
        <md-table-cell md-label="AnnualMaintenance">{{
          item.AnnualMaintenance
        }}</md-table-cell>
        <md-table-cell md-label="PowerFactorCorrection">{{
          item.PowerFactorCorrection
        }}</md-table-cell>
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

      allData: [],

      macsAddresses: [],
      myStyleGreen: {
        backgroundColor: "#16a085",
      },
      myStyleRed: {
        backgroundColor: "#9e1a1a",
      },
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
      }, 2000);
    });
    // this.getData()
  },
};
</script>
