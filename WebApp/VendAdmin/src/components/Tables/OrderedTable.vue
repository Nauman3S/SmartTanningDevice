<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.ID }}</md-table-cell>
        <md-table-cell md-label="Fingerprint">{{ item.Fingerprint }}</md-table-cell>
        <md-table-cell md-label="Last Vend">{{ item.LastVend }}</md-table-cell>
        <md-table-cell md-label="Vend Machine">{{ item.MachineNumber }}</md-table-cell>
        <md-table-cell md-label="Total Vends">{{ item.TotalVends }}</md-table-cell>
        
        
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
const API_URL_LedgerLog = "http://vend-backend.production.wrapdrive.tech/v1/getLogs";
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      allData:[],
      users: [
        {
          id: 1,
          name: "D1akota Rice",
          salary: "$36,738",
          country: "Niger",
          city: "Oud-Turnhout"
        },
        {
          id: 2,
          name: "Minerva Hooper",
          salary: "$23,738",
          country: "Curaçao",
          city: "Sinaai-Waas"
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          salary: "$56,142",
          country: "Netherlands",
          city: "Overland Park"
        },
        {
          id: 4,
          name: "Philip Chaney",
          salary: "$38,735",
          country: "Korea, South",
          city: "Gloucester"
        }
      ]
    };
  },

  
methods:{
getData(){
const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: ''
  };
  fetch(API_URL_LedgerLog, requestOptions)
    .then(response => response.json())
    .then(result => {
        
        // console.log(result.data)
        this.allData = result['data']

        this.users=this.allData
        this.$store.state.logsData=this.users;
        var i=0;
        var sum=0;
        var rews=0;
        for(i=0;i<this.users.length;i++){
          var g=this.users[i]['TotalVends']
          //var m=this.users[i]['RewardPointsEarned']
          if(g!='NaN'){
            sum=sum+parseInt(g)
            // rews=rews+parseInt(m)
          }
        }

        this.$store.state.allTimeSales=sum;
        this.$store.state.allTimeJobs=this.users.length;
        // this.$store.state.allTimeRewardsIssued=rews;
        // console.log(this.users)
        });
  },
},
  mounted(){
    this.$nextTick(function () {
            window.setInterval(() => {
                this.getData();
            },2000);
        })
    // this.getData()
  }
};
</script>
