<template>
    <v-app id="inspire">
        <Sidebar :drawer="drawer" />
        <Topbar @drawerEvent="drawer = !drawer" />
        <v-main class="py-8 px-9" fluid >
            <v-container class="pt-10">
                <div class="dashboard">
                    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
                        <h3>Dashboard</h3>
                        <v-btn color="success">
                            View Notes
                        </v-btn>
                    </v-subheader>
                    <br>



                    <v-row>
                        <v-col lg="7" cols="12">
                            <v-alert dense text type="success" :value="alert">
                                Login Successfully! Welcome to <strong>{{ user.name }}</strong>
                            </v-alert>
                            <v-row>
                                <v-col lg="6" cols="12" v-for="(item, index) in activityLog" :key="index">
                                    <v-card elevation="2" class="rounded-lg">
                                        <v-card-text class="d-flex justify-space-between align-center">
                                            <div>
                                                <strong>{{ item.title }}</strong> <br>
                                                <span>Last 3 weeks</span>
                                            </div>
                                            <v-avatar size="60" :color="item.color" style="border: 3px solid #444">
                                                <span style="color: white">{{ item.amount }} +</span>
                                            </v-avatar>
                                        </v-card-text>
                                        <v-card-actions class="d-flex justify-space-between">


                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" lg="5">
                            <v-card>
                                <v-card-title>Activities</v-card-title>
                                <v-card-text class="py-0">
                                    <v-timeline align-top dense>
                                        <v-timeline-item color="indigo" small>
                                            <strong>5 Minuts ago</strong>
                                            <div class="text-caption">
                                                You have new note please check this out
                                            </div>
                                        </v-timeline-item>
                                        <v-timeline-item color="green" small>
                                            <strong>35 Minuts ago</strong>
                                            <div class="text-caption mb-2">
                                                A Note has delivered!
                                            </div>
                                        </v-timeline-item>

                                        <v-timeline-item color="indigo" small>
                                            <strong>44 Minuts ago</strong>
                                            <div class="text-caption">
                                                You have new note please check this out
                                            </div>
                                        </v-timeline-item>
                                    </v-timeline>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        
                        

                        <v-row>
          <v-col>
            <leaderboard />
          </v-col>
        </v-row>




                    </v-row>
                </div>
              

                
            </v-container>
        </v-main>
    </v-app>
</template>


<script>
import leaderboard from "@/components/leaderboard.vue";
import Footer from '@/components/Footer.vue';
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import axios from 'axios';


export default {
    name: 'Dashboard',
    data() {
        return {
            alert: true,
            name: '',
            email: '',
            user: JSON.parse(localStorage.getItem("user")),

            //////////////////////////////////////////////////
/*
            clipped: true,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js',
        dialog: false,
         editedIndex: -1,
        editedItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0
        },
        defaultItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0
        },
        listPrimitive: null,
        */
            ////////////////////////////////////////////
            cards: ["Today", "Yesterday"],
            drawer: null,
            activityLog: [
                { title: 'Total Trainees', amount: 50, icon: 'mdi-account', color: 'cyan lighten-3' },
                { title: 'Total Employers', amount: 3433, icon: 'mdi-account-group-outline', color: 'green darken-2' },
                { title: 'Total Notes', amount: 3433, icon: 'mdi-account-group-outline', color: 'blue-grey darken-1' },
                {
                    title: 'Pending Notes',
                    amount: 3433,
                    icon: 'mdi-account-group-outline',
                    color: 'deep-orange darken-1'
                },
            ],
            headers: [
                {
                    text: 'Profile',
                    align: 'start',
                    sortable: false,
                    value: 'profile',
                    class: "blue lighten-5"
                },
                { text: 'Full Name', value: 'fullname' },
                { text: 'Email', sortable: false, value: 'email' },
                { text: 'Phone', sortable: false, value: 'phone' },
                { text: 'Address', sortable: false, value: 'address' },
                { text: 'City', value: 'city' },
                { text: 'Level', value: 'level' },
                { text: 'Job', value: 'job' },
            ],
            desserts: [
                {   
                    profile: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
                    fullname: 'Browny Yogurt',
                    email: 'Browny@gmail.com',
                    phone: '0651215223',
                    address: 'Hay Babsahra bloc b',
                    city: 'Guelmim',
                    level: 'Senior',
                    job: 'Full Stack',
                },
                {
                    fullname: 'Browny Hamza',
                    email: 'Browny@gmail.com',
                    phone: '0651215223',
                    address: 'Hay Babsahra bloc b',
                    city: 'Agadir',
                    level: 'Senior',
                    job: 'Full Stack',
                },
                {
                    fullname: 'Yogurt',
                    email: 'Browny@gmail.com',
                    phone: '0651215223',
                    address: 'Hay Babsahra bloc b',
                    city: 'Casablanca',
                    level: 'Senior',
                    job: 'Full Stack',
                },
                {
                    fullname: 'Garry harry',
                    email: 'Browny@gmail.com',
                    phone: '0651215223',
                    address: 'Hay Babsahra bloc b',
                    city: 'Rabat',
                    level: 'Senior',
                    job: 'Full Stack',
                },
                {
                    fullname: 'Kalenji Yogurt',
                    email: 'Browny@gmail.com',
                    phone: '0651215223',
                    address: 'Hay Babsahra bloc b',
                    city: 'Senju',
                    level: 'Senior',
                    job: 'Full Stack',
                },
                {
                    fullname: 'Naser Yogurt',
                    email: 'Browny@gmail.com',
                    phone: '0651215223',
                    address: 'Hay Babsahra bloc b',
                    city: 'Tanger',
                    level: 'Senior',
                    job: 'Full Stack',
                },
                {
                    fullname: 'Vicent Yogurt',
                    email: 'Browny@gmail.com',
                    phone: '0651215223',
                    address: 'Hay Babsahra bloc b',
                    city: 'Agadir',
                    level: 'Senior',
                    job: 'Full Stack',
                },
                {
                    fullname: 'Ayoub Yogurt',
                    email: 'Browny@gmail.com',
                    phone: '0651215223',
                    address: 'Hay Babsahra bloc b',
                    city: 'Agadir',
                    level: 'Senior',
                    job: 'Full Stack',
                },
                {
                    fullname: 'Erling Yogurt',
                    email: 'Browny@gmail.com',
                    phone: '0651215223',
                    address: 'Hay Babsahra bloc b',
                    city: 'Fes',
                    level: 'Senior',
                    job: 'Full Stack',
                },
                {
                    fullname: 'Ruben Yogurt',
                    email: 'Browny@gmail.com',
                    phone: '0651215223',
                    address: 'Hay Babsahra bloc b',
                    city: 'Guelmim',
                    level: 'Senior',
                    job: 'Full Stack',
                },
            ],
        }
    },
    created() {
        setTimeout(() => {
            this.alert = false
        }, 5000)
    },
    mounted() {

        this.$http.get('http://localhost:3000/api/posts')
            .then(res => {
                this.name = res.data.user.name;
                this.email = res.data.user.email;
            })
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/Register');
        },
        onButtonClick(item) {
            console.log('click on ' + item.no)
        },

        
        subscribeToUpdate() {
          this.listPrimitive.onItemAdded(item => {
            this.desserts.push(item.value)
          })

          this.listPrimitive.onItemUpdated(item => {
            //update the item at item.index
            this.desserts.splice(item.index, 1, item.value);
          })

          this.listPrimitive.onItemRemoved(item => {
            //remove the item at item.index
            this.desserts.splice(item.index, 1);
          })
        },

        editItem(item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },

        deleteItem(item) {
          const index = this.desserts.indexOf(item)
          confirm('Are you sure you want to delete this item?') && this.listPrimitive.remove(index)
        },

        close() {
          this.dialog = false
          setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          }, 300)
        },

        save() {
          if (this.editedIndex > -1) {
            this.listPrimitive.update(this.editedIndex, this.editedItem)
          } else {
            this.listPrimitive.add(this.editedItem)
          }

          this.close()
        }
    },
    computed: {
        formTitle() {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        }
      },

      watch: {
        dialog(val) {
          val || this.close()
        }
      },


    components: {
        Footer,
        Topbar,
        Sidebar,
        leaderboard,
    }
};
</script>
<style scoped>
.v-main {
  background-image: url("~@/assets/img/bgMain.png");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>