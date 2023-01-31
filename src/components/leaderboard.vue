<template>
  <div id="app">
    <v-data-table :headers="headers" :items="data" class="elevation-1" :items-per-page="5" :loading="loadTable"
      loading-text="Loading Leaderboard... Please wait">
      <template v-slot:item.avatar="{ item, index }">
        <v-badge avatar bordered overlap v-if="index < 3">
          <template v-slot:badge v-if="index < 3">
            <v-avatar>
              <v-img v-if="index == 0" src="http://strafrecht-online.org/stuff/trophy-gold.png"></v-img>
              <v-img v-if="index == 1" src="http://strafrecht-online.org/stuff/trophy-silver.png"></v-img>
              <v-img v-if="index == 2" src="http://strafrecht-online.org/stuff/trophy-bronze.png"></v-img>
            </v-avatar>
          </template>
          <v-avatar :color="getRandomColor()" size="40"><img v-if="item.avatar_url" :src="item.avatar_url" />
            <span v-else>{{ initials(item.name) }}</span>
          </v-avatar>
        </v-badge>
        <v-avatar v-else :color="getRandomColor()" size="40"><img v-if="item.avatar_url" :src="item.avatar_url" />
          <span v-else>{{ initials(item.name) }}</span>
        </v-avatar>
      </template>
      <template v-slot:item.points30="{ item }">
        <v-chip :color="`${project.status}`" :class="`white--text caption my-2`">
          {{ item.points30 }}
        </v-chip>
      </template>
      <template v-slot:item.pointsalltime="{ item }">
        <v-chip :color="getColor(item.pointsalltime)">
          {{ item.pointsalltime }}
        </v-chip>
      </template>
      <template v-slot:item.companyjob="{ item }">
        <v-chip
          :color="item.companyjob === 'Trainee' ? 'green lighten-1' : item.companyjob === 'Senior' ? 'blue' : item.companyjob === 'Junior' ? 'deep-purple accent-4' : 'orange'"
          class="ma-2" outlined transparent>
          {{ item.companyjob }}
        </v-chip>
      </template>

      <!-- <template v-slot:item.trend="{ item }">
        <v-sparkline :value="item.trend_values" :gradient="gradient" :smooth="radius || false" :padding="padding"
          :line-width="width" :stroke-linecap="lineCap" :gradient-direction="gradientDirection" :fill="fill"
          :type="type" :auto-line-width="autoLineWidth" auto-draw></v-sparkline>
      </template> -->
      <template v-slot:item.info="{ item, index }">
        <v-btn icon color="primary" small @click.stop="$set(dialogNote, item.name, true)">
          <v-icon small>mdi-open-in-new</v-icon>
        </v-btn>
        <v-btn icon color="primary" small @click.stop="$set(dialogNoteEdit, item.name, true)">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="primary" small @click.stop="$set(dialogNoteDelete, item.name, true)">
          <v-icon small> mdi-close</v-icon>
        </v-btn>
        <!--just test for 30/01/2023  -->
        <v-dialog v-model="dialogNoteEdit[item.name]" max-width="290" :key="item.name" dark outlined
          rounded>
          
        
        
        
        </v-dialog>
        <!--  -->
        <v-dialog v-model="dialogNoteDelete[item.name]" max-width="290" :key="item.name" dark outlined
          rounded>
          <v-card>
            <v-card-title class="text-h5">
              Do you want to delete {{item.name}}
            </v-card-title>

            <v-card-text>
              Make Sure First 
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click.stop="$set(dialogNoteDelete, item.name, false)" outlined rounded >
                Cancel
              </v-btn>

              <v-btn color="green darken-1" text @click.stop="$set(dialogNoteDelete, item.name, false)" outlined rounded >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogNote[item.name]" scrollable lazy max-width="500" :key="item.name" dark outlined
          rounded>
          <v-card dark :img="require('@/assets/img/bgDrawer.jpg')">
            <v-card style="background-color: transparent;">
              <v-list-item three-line>
                <v-list-item-content class="pa-5">
                  <div class="overline mb-5">{{ item.companyjob }}</div>
                  <v-list-item-title class="headline mb-1"><span>{{ item.name }}</span></v-list-item-title>
                  <v-list-item-subtitle>Web Developer</v-list-item-subtitle>
                </v-list-item-content>

                <v-avatar :color="getRandomColor()" size="100" class="ml-50">
                  <img v-if="item.avatar_url" :src="item.avatar_url" />
                  <span v-else>{{ initials(item.name) }}</span>
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
                  <v-list-item-title>{{ item.phone }}</v-list-item-title>
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
                  <v-list-item-title>{{ item.adress }}</v-list-item-title>
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
              <v-btn flat @click.stop="$set(dialogNote, item.name, false)" outlined rounded text>Close</v-btn>
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
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Email", value: "email" },
        //{ text: "Points Alltime", value: "pointsalltime" },
        { text: "Phone", value: "phone", sortable: false },
        { text: "City", value: "city" },
        { text: "Company Job", value: "companyjob" },
        { text: "", value: "info", sortable: false },
      ],
      data: [
        {
          name: "Roland Hefendehl",
          email: "Roland@gmail.com",
          phone: "0651213021",
          city: "Agadir",
          adress: "Hay Babsahra Bloc B Rue 19 no.17",

          zipcode: "81001",
          companyjob: "Senior",
          points30: 159,
          pointsalltime: 1000,
          avatar_url:
            "http://strafrecht-online.org/personen/roland.hefendehl/IMG_8066.jpg",
          trend_values: this.getRandomArray(15, 30),
        },
        {
          name: "Lucas Robinson",
          email: "Roland@gmail.com",
          phone: "0651213021",
          city: "Agadir",
          adress: "Hay Babsahra Bloc B Rue 19 no.17",
          zipcode: "81001",
          companyjob: "Trainee",
          points30: 237,
          pointsalltime: 500,
          trend_values: this.getRandomArray(15, 30),
        },
        {
          name: "Isabelle Hall",
          email: "Roland@gmail.com",
          phone: "0651213021",
          city: "Agadir",
          adress: "Hay Babsahra Bloc B Rue 19 no.17",
          zipcode: "81001",
          companyjob: "Junior",
          points30: 262,
          pointsalltime: 300,
          trend_values: this.getRandomArray(15, 30),
        },
        {
          name: "Natalia Gonzales",
          email: "Gonzales@gmail.com",
          phone: "0651213021",
          city: "Agadir",
          adress: "Hay Babsahra Bloc B Rue 19 no.17",
          zipcode: "81001",
          companyjob: "Workin Student",
          points30: 262,
          pointsalltime: 300,
          trend_values: this.getRandomArray(15, 30),
        },
        {
          name: "Nelson Rogers",
          email: "Rogers@gmail.com",
          phone: "0651213021",
          city: "Guelmim",
          adress: "Hay Babsahra Bloc B Rue 19 no.17",
          zipcode: "81001",
          companyjob: "Trainee",
          points30: 262,
          pointsalltime: 300,
          trend_values: this.getRandomArray(15, 30),
        },
        {
          name: "Mira Rosales",
          email: "Rosales@gmail.com",
          phone: "0651213021",
          city: "Agadir",
          adress: "Hay Babsahra Bloc B Rue 19 no.17",
          zipcode: "81001",
          companyjob: "Trainee",
          points30: 262,
          pointsalltime: 300,
          trend_values: this.getRandomArray(15, 30),
        },
        {
          name: "Jack Spencer",
          email: "Spencer@gmail.com",
          phone: "0651213021",
          city: "Laayoune",
          adress: "Hay Babsahra Bloc B Rue 19 no.17",
          zipcode: "81001",
          companyjob: "Working Student",
          points30: 262,
          pointsalltime: 300,
          trend_values: this.getRandomArray(15, 30),
        },
        {
          name: "Benjamin Marsh",
          email: "Benjamin@gmail.com",
          phone: "0651213021",
          city: "Fes",
          adress: "Hay Babsahra Bloc B Rue 19 no.17",
          zipcode: "81001",
          companyjob: "Working Student",
          points30: 262,
          pointsalltime: 300,
          trend_values: this.getRandomArray(15, 30),
        },
        {
          name: "Zac Moss",
          email: "Zac-moss@gmail.com",
          phone: "0651213021",
          city: "Agadir",
          adress: "Hay Babsahra Bloc B Rue 19 no.17",
          zipcode: "81001",
          companyjob: "Trainee",
          points30: 262,
          pointsalltime: 300,
          trend_values: this.getRandomArray(15, 30),
        },
        {
          name: "Ellen Dodson",
          email: "Roland@gmail.com",
          phone: "0651213021",
          city: "Agadir",
          adress: "Hay Babsahra Bloc B Rue 19 no.17",
          zipcode: "81001",
          companyjob: "Trainee",
          points30: 262,
          pointsalltime: 300,
          trend_values: this.getRandomArray(15, 30),
        },
        {
          name: "Sabrina Thomas",
          email: "Roland@gmail.com",
          phone: "0651213021",
          city: "Agadir",
          adress: "Hay Babsahra Bloc B Rue 19 no.17",
          zipcode: "81001",
          companyjob: "Senior",
          points30: 262,
          pointsalltime: 300,
          trend_values: this.getRandomArray(15, 30),
        },
        {
          name: "Danny Cunningham",
          email: "Roland@gmail.com",
          phone: "0651213021",
          city: "Agadir",
          adress: "Hay Babsahra Bloc B Rue 19 no.17",
          zipcode: "81001",
          companyjob: "Junior",
          points30: 262,
          pointsalltime: 300,
          trend_values: this.getRandomArray(15, 30),
        },
        {
          name: "Tanner Lott",
          email: "Tanner-Lott@gmail.com",
          phone: "0651213021",
          city: "Casablanca",
          adress: "Hay Babsahra Bloc B Rue 19 no.17",
          zipcode: "81001",
          companyjob: "Junior",
          points30: 262,
          pointsalltime: 300,
          trend_values: this.getRandomArray(15, 30),
        },
        {
          name: "Jude Pearson",
          email: "Jude-Pearson@gmail.com",
          phone: "0651213021",
          city: "Agadir",
          adress: "Hay Babsahra Bloc B Rue 19 no.17",
          zipcode: "81001",
          companyjob: "Senior",
          points30: 262,
          pointsalltime: 300,
          trend_values: this.getRandomArray(15, 30),
        },



      ],

    };
  },
  methods: {
    getColor1(companyjob) {
      if (companyjob = "Senior") return "red";
      else if (companyjob = "Junior") return "orange";
      else if (companyjob = 'Trainee') return "blue";
      else return "transparent";
    },
    getColor(points) {
      if (points > 500) return "green";
      else if (points > 300) return "orange";
      else return "transparent";
    },

    initials(fullName) {
      let arrName = fullName.split(" ");
      let iniName = fullName.charAt(0);
      let iniLname = arrName[arrName.length - 1].charAt(0);
      return iniName + iniLname;
    },
    getRandomColor() {
      let colors = ["#34686f", "#dfa288", "#fff5bc", "#9cccae", "#fbffd7"];
      let rand = Math.floor(Math.random() * colors.length);
      return colors[rand];
    },
    getRandomArray(length, max) {
      return Array.apply(null, Array(length)).map(function () {
        return Math.round(Math.random() * max);
      });
    },
 
  },
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