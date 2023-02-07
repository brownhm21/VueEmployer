<template>
  <div id="app">
    <v-data-table :headers="headers" :items="Employers" class="elevation-1" :items-per-page="5" :loading="loadTable"
      loading-text="Loading Leaderboard... Please wait">
      <template v-slot:item.avatar="{ item }">
        <v-badge avatar bordered overlap >
          <template v-slot:badge >
            <v-avatar>
              <v-img v-if="item.jobs.level === 'Senior'" src="http://strafrecht-online.org/stuff/trophy-gold.png"></v-img>
              <v-img v-if="item.jobs.level === 'Junior'" src="http://strafrecht-online.org/stuff/trophy-silver.png"></v-img>
              <v-img v-if="item.jobs.level === 'Trainee'" src="http://strafrecht-online.org/stuff/trophy-bronze.png"></v-img>
               </v-avatar>
          </template>
          <v-avatar size="40">
            <img :src="path + item.avatar" />

          </v-avatar>
        </v-badge>

      </template> -->
      <!-- <template v-slot:item.points30="{ item }">
        <v-chip :color="`${project.status}`" :class="`white--text caption my-2`">
          {{ item.points30 }}
        </v-chip>
      </template>
      <template v-slot:item.email="{ item }">
      {{ item.email }}
    </template>
    <template v-slot:item.LastName="{ item }">
      {{ item.LastName }}
    </template>
      <template v-slot:item.pointsalltime="{ item }">
        <v-chip :color="getColor(item.pointsalltime)">
          {{ item.pointsalltime }}
        </v-chip>
      </template>
      

      <!<template v-slot:item.trend="{ item }">
        <v-sparkline :value="item.trend_values" :gradient="gradient" :smooth="radius || false" :padding="padding"
          :line-width="width" :stroke-linecap="lineCap" :gradient-direction="gradientDirection" :fill="fill"
          :type="type" :auto-line-width="autoLineWidth" auto-draw></v-sparkline>
      </template> -->
      <template v-slot:item.jobs.level="{ item }">
        <v-chip
          :color="item.jobs.level === 'Trainee' ? 'green lighten-1' : item.jobs.level === 'Senior' ? 'blue' : item.jobs.level === 'Junior' ? 'deep-purple accent-4' : item.jobs.level === 'Working Student' ? 'red lighten-1' : 'orange'"
          class="ma-2" outlined transparent>
          {{ item.jobs.level }}
        </v-chip>
      </template>
      <template v-slot:item.info="{ item, index }">
        <v-btn icon color="primary" small @click.stop="$set(dialogNote, item.id, true)">
          <v-icon small>mdi-open-in-new</v-icon>
        </v-btn>
        <v-btn icon color="primary" small @click.stop="$set(dialogNoteEdit, item.id, true)">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="primary" small @click.stop="$set(dialogNoteDelete, item._id, true)">
          <v-icon small> mdi-delete</v-icon>
        </v-btn>
        <!--just test for 30/01/2023  -->
        <v-dialog v-model="dialogNoteEdit[item.id]" max-width="290" :key="item.id" dark outlined rounded>
          



        </v-dialog>
        <!--  -->
        <v-dialog v-model="dialogNoteDelete[item._id]" max-width="350" :key="item._id" dark outlined
          rounded>
          <v-card>
            <v-card-title class="text-h5">
              Do you want to delete <br> {{ item.Lastname }} 
            </v-card-title>

            <v-card-text>
              Make Sure First
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click.stop="$set(dialogNoteDelete, item._id, false)" outlined
                rounded>
                Cancel
              </v-btn>

              <v-btn color="red darken-1" text @click="deleteEmployer(item)" outlined
                rounded>
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogNote[item.id]" scrollable lazy max-width="500" :key="item.id" dark outlined
          rounded>
          <v-card dark :img="require('@/assets/img/bgDrawer.jpg')">
            <v-card style="background-color: transparent;">
              <v-list-item three-line>
                <v-list-item-content class="pa-5">
                  <div class="overline mb-5">{{ item.jobs.level }}</div>
                  <v-list-item-title class="headline mb-1"><span>{{ item.Lastname }}</span></v-list-item-title>
                  <v-list-item-subtitle>{{ item.jobs.companyjob }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-avatar size="100" class="ml-50">
                  <img :src="path + item.avatar" />

                </v-avatar>
              </v-list-item>
            </v-card>
            <v-divider class="mx-4"></v-divider>

            <!-- <v-card title="Infos" style="background-color: transparent;" class="pa-4">
              <v-row :align="center" class="spacer" >
                <v-col cols="4" sm="2" md="1">
                  <v-avatar size="36px" :color="getRandomColor()">
                    <v-img v-if="item.avatar_url" :src="item.avatar_url"></v-img>
                    <span v-else>{{ initials(item.name) }}</span>
                  </v-avatar>
                </v-col>

                <v-col class="hidden-xs-only text-left ms-2" sm="5" md="20">
                  <strong v-html="item.name"></strong>
                  
                </v-col>
              </v-row>
              <v-divider inset></v-divider>
              <v-row :align="center" class="spacer" no-gutters>
                <v-col cols="4" sm="2" md="1">
                  <v-avatar size="36px" :color="getRandomColor()">
                    <v-img v-if="item.avatar_url" :src="item.avatar_url"></v-img>
                    <span v-else>{{ initials(item.name) }}</span>
                  </v-avatar>
                </v-col>

                <v-col class="hidden-xs-only text-left ms-2" sm="5" md="20">
                  <strong v-html="item.name"></strong>
                  
                </v-col>

                
              </v-row>
            </v-card> -->

            <v-card style="background-color: transparent;" class="pa-md-2 ">

              <v-list-item>
                <v-list-item-avatar>
                  <v-icon color="blue-grey darken-1">mdi-email</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ item.email }}</v-list-item-title>
                </v-list-item-content>

              </v-list-item>

              <v-divider inset></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-icon color="blue-grey darken-1">mdi-phone</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ item.phoneNumber }}</v-list-item-title>
                </v-list-item-content>


              </v-list-item>

              <!-- <v-divider inset></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-icon color="blue-grey darken-1">mdi-email</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>mcbeal@example.com</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->

              <v-divider inset></v-divider>

              <v-list-item>
                <!-- <v-list-item-action>
                  <v-icon color="blue-grey darken-1">mdi-map-marker-radius</v-icon>
                </v-list-item-action> -->
                <v-list-item-avatar>
                  <v-icon color="blue-grey darken-1">mdi-map-marker-radius</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ item.address }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-icon color="blue-grey darken-1">mdi-map-marker</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ item.city }}, {{ item.zipcode }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>



            </v-card>











            <v-card-actions>
              <v-btn flat @click.stop="$set(dialogNote, item.id, false)" outlined rounded text>Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
  </div>
</template>
<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
const status = {
  1: 'Trainee',
  2: 'Working Student',
  3: 'Junior',
  4: 'Senior',

};
const statusColor = {
  Trainee: 'primary',
  'Working Student': 'success',
  Junior: 'error',
  Senior: 'warning',

};

import axios from 'axios';
import config from '../config';
import Badge from "./Badge.vue";

export default {
  name: "leaderboard",
  /* props: {
     data: {
       type: Object,
       default: () => ({})
     }
   },*/
  data() {
    return {
      /////////////////////
      items: [],
      path: config.api_url,
      Employers: [],
      userdata: JSON.parse(localStorage.getItem("user")),
      ///////////////////////
      itemToDelete: {},
      //////////////////////
      messages: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name: 'John Leider',
          title: 'Welcome to Vuetify!',
          excerpt: 'Thank you for joining our community...',
        },
        {
          color: 'red',
          icon: 'mdi-account-multiple',
          name: 'Social',
          new: 1,
          total: 3,
          title: 'Twitter',
        },
        {
          color: 'teal',
          icon: 'mdi-tag',
          name: 'Promos',
          new: 2,
          total: 4,
          title: 'Shop your way',
          exceprt: 'New deals available, Join Today',
        },
      ],




      /////////////////////////
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: "round",
      gradient: gradients[5],

      gradientDirection: "top",
      gradients,
      fill: false,
      type: "trend",
      autoLineWidth: false,
      dialogNote: {},
      dialogNoteEdit: {},
      dialogNoteDelete: {},

      loadTable: false,
      headers: [
        {
          text: "",
          sortable: false,
          value: "avatar",
        },
        {
          text: "Last name",
          align: "start",
          sortable: false,
          value: "Lastname",
        },

        { text: "Email", value: "email" },

        { text: "Phone", value: "phoneNumber", sortable: false, },
        { text: "Address", value: "address", sortable: false, },
        { text: "City", value: "city" },
        { text: "Level", value: "jobs.level" },
        { text: "Company Job", value: "jobs.companyjob" },
        

        { text: "", value: "info", sortable: false },
      ],


    };
  },
  methods: {
    EmployerDelete( index) {
        axios.delete('http://localhost:3000/api/employer/delete-employer/'+item._id)
        .then(response => this.Employers.splice(index, 1));
      },
      deleteItem() {
        console.log('deleteItem', this.itemToDelete)
        const index = this.Employers.indexOf(this.itemToDelete)
        
        /*
        axios.delete(`https://api.airtable.com/v0/${airTableApp}/${airTableName}/${id}`,
            { headers: { 
                Authorization: "Bearer " + apiToken,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            this.items.splice(index, 1)
        })
        */
        
        this.Employers.splice(index, 1)
        
    },
     
      deleteEmployer(item) {
      axios.delete(`http://localhost:3000/api/employer/delete-employer/${item._id}`)
      .then(response => 
      
      console.log(response ),
      this.Employers.splice(this.Employers.indexOf(item),1),


      

      
      
      
      )
      .catch(error => alert(error)) 
      
    },
    deleteItem(item) {
            axios.delete('http://localhost:3000/api/employer/delete-employer/' + item.id)
                .then(response => {
                   const index = this.Employers.findIndex(item => item.id === id) // find the post index 
                   if (~index) // if the post exists in array
                     this.Employers.splice(index, 1) //delete the post
                });

        },
    deleteData: function(item, id) {
      axios.delete('http://localhost:3000/api/employer/delete-employer' + item.id)
      .then(response => {
        this.item.splice(id, 1)
        console.log(this.item);
      });
    },
    // getColor1(companyjob) {
    //   if (companyjob = "Senior") return "red";
    //   else if (companyjob = "Junior") return "orange";
    //   else if (companyjob = 'Trainee') return "blue";
    //   else return "transparent";
    // },
    // getColor(points) {
    //   if (points > 500) return "green";
    //   else if (points > 300) return "orange";
    //   else return "transparent";
    // },

    // initials(fullName) {
    //   let arrName = fullName.split(" ");
    //   let iniName = fullName.charAt(0);
    //   let iniLname = arrName[arrName.length - 1].charAt(0);
    //   return iniName + iniLname;
    // },
    // getRandomColor() {
    //   let colors = ["#34686f", "#dfa288", "#fff5bc", "#9cccae", "#fbffd7"];
    //   let rand = Math.floor(Math.random() * colors.length);
    //   return colors[rand];
    // },
    // getRandomArray(length, max) {
    //   return Array.apply(null, Array(length)).map(function () {
    //     return Math.round(Math.random() * max);
    //   });
    // },
    // loadItems() {
    //     this.items = []
    //     axios.get(`http://localhost:3000/api/employer/employerCompanyByuser/${this.userdata._id}`)
    //     .then((response) => {
    //         this.items = response.data.records.map((item)=>{
    //             return items
    //         })
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // },
    // loadEmployers(){
    //     axios.get(`http://localhost:3000/api/employer/employerCompanyByuser/${this.userdata._id}`)
    //     .then((response) => {
    //       //Then injecting the result to datatable parameters.

    //       this.Employers = response.data.Employers;

    //     }).catch((error) => {
    //         console.log(error)
    //     })

    // }

  },
  //   watch: {
  //   options: {
  //     handler() {
  //       this.loadEmployers();
  //     },
  //     deep: true
  //   },
  // },
  computed: {
    /*badgeColor() {
      const mappings = {
        Trainee: "purple",
        "Feature Request": "teal",
        WorkingStudent: "blue",
        Senior: "green",
        default: "teal"
      };
      return mappings[this.data.companyjob] || mappings.default;
    }*/
  },
  mounted() {
    // this.loadItems(),
    // this.loadEmployers()
    axios.get(`http://localhost:3000/api/employer/employerCompanyByuser/${this.userdata._id}`)
      .then((response) => {
        //Then injecting the result to datatable parameters.

        this.Employers = response.data;

      }).catch((error) => {
        console.log(error)
      });

  },
  components: {
    Badge
  },
};
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css");

.rounded-card {
  border-radius: 50px;
}

.v-chip:hover * {
  cursor: pointer !important;
}

/*test*/
#chip.v-chip.Senior {
  background: #00cc00;
}

#chip.v-chip.Trainee {
  background: #0099ff;
}

#chip.v-chip.overdue {
  background: #ff0000;
}
</style>