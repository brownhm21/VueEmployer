<template>
  <div id="app">
   
    <v-data-table :headers="headers" :items="Employers" class="elevation-1" :search="search" :items-per-page="5" :loading="loadTable"
      loading-text="Loading Leaderboard... Please wait">
      <template v-slot:item.avatar="{ item }">
        <v-badge avatar bordered overlap>
          <template v-slot:badge>
            <v-avatar>
              <v-img v-if="item.jobs.level === 'Senior'"
                src="http://strafrecht-online.org/stuff/trophy-gold.png"></v-img>
              <v-img v-if="item.jobs.level === 'Junior'"
                src="http://strafrecht-online.org/stuff/trophy-silver.png"></v-img>
              <v-img v-if="item.jobs.level === 'Trainee'"
                src="http://strafrecht-online.org/stuff/trophy-bronze.png"></v-img>
              <v-img v-if="item.jobs.level === 'Working Student'"
                src="https://cdn-icons-png.flaticon.com/512/972/972228.png"></v-img>

            </v-avatar>
          </template>
          <v-avatar size="50">
            <img :src="path + item.avatar" />

          </v-avatar>
        </v-badge>

      </template>
      <template v-slot:item.fullname="{ item }">
        <span>{{ getItemText(item) }}</span>

      </template>

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
        <v-btn icon color="primary" small @click.stop="$set(dialogNote, item._id, true)">
          <v-icon small>mdi-open-in-new</v-icon>
        </v-btn>
        <v-btn icon color="primary" small @click.stop="$set(dialogNoteEdit, item._id, true)">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="primary" small @click.stop="$set(dialogNoteDelete, item._id, true)">
          <v-icon small> mdi-delete</v-icon>
        </v-btn>
        <!--just test for 30/01/2023  -->
        <v-dialog v-model="dialogNoteEdit[item._id]"  :key="item._id" dark outlined rounded >
          <template>
            <v-row>
              <v-form ref="form" class="d-flex flex-column justify-center gap-5">
                <v-col cols="12">
                  <v-card title="Account Details" elevation="12">
                    <v-card-text class="d-flex ">

                      <!-- 👉 Avatar -->
                      <v-avatar rounded="lg" size="100" class="me-6" color="primary"><img
                          :src="path + item.avatar" /></v-avatar>

                      <!-- 👉 Upload Photo -->

                      <div class="d-flex flex-wrap gap-1">
                        <v-btn color="primary" @click="$refs.refInputEl?.click()">
                          <v-icon icon="mdi-cloud-upload-outline" class="d-sm-none" />
                          <span class="d-none d-sm-block">Upload new photo</span>
                        </v-btn>

                        <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden @input="">

                        <v-btn type="reset" color="error" variant="tonal" @click="">
                          <span class="d-none d-sm-block">Reset</span>
                          <v-icon icon="mdi-refresh" class="d-sm-none" />
                        </v-btn>

                      </div>


                    </v-card-text>

                    <v-divider />
                    <v-card-text>
                      <v-row>
                        <v-col cols="12">
                          <div class="headline">Employer Infos</div>
                        </v-col>
                      </v-row>

                      <v-row>

                        <!-- 👉 First Name -->
                        <v-col md="6" cols="12">
                          <v-text-field label="First Name" v-model="item.Firstname" outlined
                            prepend-inner-icon="mdi-account-arrow-right-outline" :rules="requiredRules" />

                        </v-col>

                        <!-- 👉 Last Name -->
                        <v-col md="6" cols="12">
                          <v-text-field label="Last Name" v-model="item.Lastname" outlined
                            prepend-inner-icon="mdi-account-arrow-left-outline" :rules="requiredRules" />

                        </v-col>

                        <!-- 👉 Email -->
                        <v-col cols="12" md="6">
                          <v-text-field label="E-Mail" v-model="item.email" outlined :rules="emailRules"
                            prepend-inner-icon="mdi-email-outline" />

                        </v-col>

                        <!-- 👉 Phone  -->
                        <v-col cols="12" md="6">
                          <v-text-field label="Phone Number" v-model="item.phoneNumber" outlined counter="10"
                            :rules="numberRules" prepend-inner-icon="mdi-cellphone" />

                        </v-col>

                        <!-- 👉 Address -->
                        <v-col cols="12" md="6">
                          <v-text-field label="Address" v-model="item.address" outlined :rules="requiredRules"
                            prepend-inner-icon="mdi-home-variant" />

                        </v-col>

                        <!-- 👉 city -->
                        <v-col cols="12" md="6">
                          <v-text-field label="City" v-model="item.city" outlined :rules="requiredRules"
                            prepend-inner-icon="mdi-map-marker-multiple" />

                        </v-col>



                        <!-- 👉 Zip Code -->
                        <v-col cols="12" md="6">
                          <v-text-field label="Zip Code" v-model="item.zipcode" outlined counter="5"
                            :rules="numberRules" prepend-inner-icon="mdi-map" />

                        </v-col>




                      </v-row>
                      <v-row class="mb-0 mr-6">
                        <v-col cols="12">
                          <div class="headline">Jobs</div>
                        </v-col>
                      </v-row>
                      <v-row class="rounded mb-2 mx-0" style="border: 1px solid lightgrey;">
                        <v-col cols="12" md="3">
                          <v-autocomplete :items="positions" label="Level" prepend-icon="mdi-domain"
                            :rules="requiredRules" v-model="item.jobs.level" />
                        </v-col>

                        <v-col cols="12" md="4">
                          <v-text-field label="Company Job" :rules="requiredRules" hint="The name is quite enough."
                            prepend-icon="mdi-wallet-travel" v-model="item.jobs.companyjob" />
                        </v-col>

                        <v-col cols="12" md="4">
                          <v-autocomplete v-model="item.jobs.company" label="Company Name" prepend-icon="mdi-domain"
                            :rules="requiredRules" item-value="_id" item-text="companyName" :items="companies" />
                        </v-col>

                        <v-col cols="12" sm="6" md="3" v-if="item.jobs.level === 'Trainee'">
                          <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="item.jobs.startdate" label="Start Date" prepend-icon="event"
                                v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="item.jobs.startdate" @input="menu2 = false"></v-date-picker>
                          </v-menu>
                          <!--  -->

                        </v-col>
                        <v-col cols="12" md="3" v-if="item.jobs.level === 'Trainee'">
                          <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="item.jobs.endDate" label="End Date" prepend-icon="event"
                                v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="item.jobs.endDate"></v-date-picker>
                          </v-menu>







                        </v-col>

                      </v-row>
                      <v-divider />
                      <v-row class="mt-2">
                        <v-col cols="12" class="d-flex flex-wrap gap-4">
                          <v-btn color="primary" @click="submitEditForm(item)">Save changes</v-btn>

                          <v-btn color="secondary" variant="tonal" type="reset" @click.prevent="reset">
                            Reset
                          </v-btn>
                        </v-col>
                      </v-row>


                    </v-card-text>



                  </v-card>
                </v-col>
              </v-form>


            </v-row>


          </template>


        </v-dialog>
        <!--  -->
        <v-dialog v-model="dialogNoteDelete[item._id]" max-width="450" :key="item._id" dark outlined rounded>
          <v-card>
            <v-card-title class="text-h5">
              Do you want to delete <br> {{ item.Lastname }}
            </v-card-title>

            <v-card-text>
              Make Sure First
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click.stop="$set(dialogNoteDelete, item._id, false)" outlined rounded>
                Cancel
              </v-btn>

              <v-btn color="red darken-1" text @click="deleteEmployer(item)" outlined rounded>
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogNote[item._id]" scrollable lazy max-width="500" :key="item._id" dark outlined rounded>
          <v-card dark :img="require('@/assets/img/bgDrawer.jpg')">
            <v-card style="background-color: transparent;">
              <v-list-item three-line>
                <v-list-item-content class="pa-5">
                  <div class="overline mb-5">{{ item.jobs.level }}</div>
                  <v-list-item-title class="headline mb-1"><span>{{ item.Firstname }} {{
                    item.Lastname
                  }}</span></v-list-item-title>
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
              <v-list-item v-if="item.jobs.level === 'Trainee'">
                <v-list-item-avatar>
                  <v-icon color="blue-grey darken-1">mdi-calendar-range</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ item.jobs.startdate }} / {{ item.jobs.endDate }} </v-list-item-title>
                </v-list-item-content>

              </v-list-item>

              <v-divider inset></v-divider>

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
              <v-btn flat @click.stop="$set(dialogNote, item._id, false)" outlined rounded text>Close</v-btn>
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
import Swal from "sweetalert2";

export default {
  name: "leaderboard",
 
  data() {
    return {
      search:'',
      /////////////////////
      menu: false,
      modal: false,
      menu2: false,
      menu3: false,
      /////////////////
      positions: [
        "Trainee",
        "Working Student",
        "Intern",
        "Junior",
        "Senior",
        "V-Level",
        "C-Level"
      ],
      companies: [],
      calenderModal: false,

      Employers1: [],

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
          text: "Full name",
          align: "start",
          sortable: false,
          value: "fullname",
        },

        { text: "Email", value: "email" },

        { text: "Phone", value: "phoneNumber", sortable: false, },
        { text: "Address", value: "address", sortable: false, },
        { text: "City", value: "city" },
        { text: "Level", value: "jobs.level" },
        { text: "Company Job", value: "jobs.companyjob" },


        { text: "", value: "info", sortable: false },
      ],
      requiredRules: [(v) => !!v || "Please fill out this field!"],
      numberRules: [
        (v) => !!v || "Please fill out this field!",
        (v) => Number.isInteger(Number(v)) || "Please enter numbers only!"
      ],
      emailRules: [
        (v) => !!v || "Please fill out the field!",
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],


    };
  },
  methods: {
    getItemText(item) {
      return `${item.Firstname} ${item.Lastname}`;
    },
    reset() {
      this.$refs.form.reset();
    },
    EmployerDelete(index) {
      axios.delete('http://localhost:3000/api/employer/delete-employer/' + item._id)
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
    ///////////////////////////
    validateDate(dateRange) {
      if (dateRange.length === 2) {
        this.calenderModal = false;
      }
    },
    ///////////////////////////working delete function
    deleteEmployer(item) {
      axios.delete(`http://localhost:3000/api/employer/delete-employer/${item._id}`)
        .then(response =>

          console.log(response),
          this.Employers.splice(this.Employers.indexOf(item), 1),

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
    deleteData: function (item, id) {
      axios.delete('http://localhost:3000/api/employer/delete-employer' + item.id)
        .then(response => {
          this.item.splice(id, 1)
          console.log(this.item);
        });
    },

    show: function () {
      axios.get(`http://localhost:3000/api/employer/employerCompanyByuser/${this.userdata._id}`
      )
        .then(response => {
          this.Employers1 = response.data;
        })
    },
    Range(item) {
      return `${item.jobs.startdate} `;
    },
    submitEditForm(item) {
      console.log(item)
      // let job = JSON.parse(JSON.stringify(this.jobs));
      let formData = new FormData();
      formData.append("Firstname", item.Firstname);
      formData.append("Lastname", item.Lastname);
      //formData.append("email", item.email);
      formData.append("phoneNumber", item.phoneNumber);

      formData.append("address", item.address);
      formData.append("city", item.city);
      formData.append("zipcode", item.zipcode);
      formData.append("jobs.level", item.jobs.level);
      formData.append("jobs.companyjob", item.jobs.companyjob);
      // (this.jobs.dateRange != null) ? formData.append("startdate", this.jobs.dateRange[0]) : '';
      // (this.jobs.dateRange != null) ? formData.append("endDate", this.jobs.dateRange[1]) : '';
      (item.jobs.startdate != null) ? formData.append("jobs.startdate", item.jobs.startdate) : '';
      (item.jobs.endDate != null) ? formData.append("jobs.endDate", item.jobs.endDate) : '';

      // formData.append("createdByu", item.userdata._id);
      formData.append("company", item.jobs.companyName);
      formData.append("file", item.image);
      console.log(Object.fromEntries(formData));
      // console.log(job);

      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.patch(`http://localhost:3000/api/employer/update-employerr/${item._id}`,
        formData,

      ).then(res => {
        Swal.fire('Saved!', '', 'success')
        
        console.log(res);




      })
        .catch(err => {
          Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',


                    })
          console.log(err)


        });


        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
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
    // fullDate: {
    //   get(item) {
    //     return `${this.firstName} ${this.lastName}`;
    //   },
    //   set(newValue) {
    //     const m = newValue.match(/(\S*)\s+(.*)/);

    //     this.firstName = m[1];
    //     this.lastName = m[2];
    //   }
    // }
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

    axios.get(`http://localhost:3000/api/company/companyUserr/${this.userdata._id}`)
      .then(response => {
        this.companies = response.data;
      })
      .catch(error => {
        console.error(error);
      });

    axios.get(`http://localhost:3000/api/employer/employerCompanyByuser/${this.userdata._id}`)
      .then((response) => {
        //Then injecting the result to datatable parameters.

        this.Employers1 = response.data;

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