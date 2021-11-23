<template>
  <div>
    <md-table v-model="macs" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="DeviceMAC">{{ item.DeviceMAC }}</md-table-cell>
        <!-- <md-table-cell md-label="Country">{{ item.country }}</md-table-cell>
        <md-table-cell md-label="City">{{ item.city }}</md-table-cell>
        <md-table-cell md-label="Salary">{{ item.salary }}</md-table-cell> -->
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
const API_LIST_MAC = "http://34.214.65.82:8080/v1/listAllUniqueMAC";
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: [],
      macs: [
        {
          name: "Dakota Rice",
          salary: "$36,738",
          country: "Niger",
          city: "Oud-Turnhout",
        },
        {
          name: "Minerva Hooper",
          salary: "$23,738",
          country: "Curaçao",
          city: "Sinaai-Waas",
        },
        {
          name: "Sage Rodriguez",
          salary: "$56,142",
          country: "Netherlands",
          city: "Overland Park",
        },
        {
          name: "Philip Chaney",
          salary: "$38,735",
          country: "Korea, South",
          city: "Gloucester",
        },
        {
          name: "Doris Greene",
          salary: "$63,542",
          country: "Malawi",
          city: "Feldkirchen in Kārnten",
        },
        {
          name: "Mason Porter",
          salary: "$78,615",
          country: "Chile",
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
      fetch(API_LIST_MAC, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          console.log(result.data);
          this.allData = result["data"];

          this.macs = this.allData;
          this.$store.state.uniqueMAC = this.macs;
          var i = 0;
          var macsList = [];

          for (i = 0; i < this.macs.length; i++) {
            var g = this.macs[i]["DeviceMAC"];

            if (g != "NaN") {
              macsList.push(g);
            }
          }
          console.log(macsList);
          console.log(this.macs);
          var uniqueDevices = new Set(macsList).size;

          // this.$store.state.totalDevices = uniqueDevices;
          // this.$store.state.totalLogs = this.macs.length;
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
