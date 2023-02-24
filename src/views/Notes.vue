<template>
  <v-app id="inspire">
    <Sidebar :drawer="drawer" />
    <Topbar @drawerEvent="drawer = !drawer" />
    <v-main class="px-0 mx-0">
      <v-container class="pt-45">
        <v-card>
          <v-toolbar color="primary" elevation="3" dark rounded="4">
            <v-toolbar-title>Tasks</v-toolbar-title>
          </v-toolbar>
        </v-card>
        <v-card class="ma-4" v-show="tasks.length > 0">
          <v-list>
            <v-list-item v-for="(task, index) in tasks" :key="index"
              v-bind:class="{ 'task-completed': task.isCompleted }" two-line>
              <v-checkbox hide-details v-model="task.isCompleted" class="mt-0 mr-2"></v-checkbox>
              <v-list-item-content>
                <v-list-item-title>{{ task.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ task.note }}</v-list-item-subtitle>
              </v-list-item-content>
              <div class="flex mt-4 justify-between items-center">
                <span class="text-sm text-gray-600">{{ task.date }}</span>

              </div>
            </v-list-item>
          </v-list>
        </v-card>
        <v-btn fab fixed right bottom color="primary" @click="showNewTaskDialog = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-dialog v-model="showNewTaskDialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab fixed right bottom color="primary" v-on="on" v-bind="attrs">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5 blue lighten-2">
              <v-avatar>
                <img src="@/assets/img/logo2.png" alt="Logo" />
              </v-avatar>
              <span class="px-3 text-center text-base font-weight-semibold " style="color:white">Add New Task</span>


            </v-card-title>
            <v-form class="mx-4 mt-4 pb-4" ref="form" @submit.prevent="newTaskFormSubmit" lazy-validation>
              <!-- test -->
              <v-row class="pa-3 align-center">

                <v-autocomplete label="To:" outlined :items="Employers" item-value="_id" :item-text="getItemText" multiple>

                  <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip v-bind="attrs" :input-value="selected" color="primary" close  @click="select"
                      @click:close="remove(item)">
                      <v-avatar >
                        <v-img :src="path + item.avatar"></v-img>
                      </v-avatar>
                      <div class="px-2"> <strong>{{ item.Firstname }} {{ item.Lastname }}</strong> </div>
                      
                    </v-chip>
                  </template>

                 <!-- <v-list> -->
                  <!-- <template v-slot:item="{item}">
                    <v-list-item >
              <v-list-item-avatar>
                <v-img :src="path + item.avatar"></v-img>
              </v-list-item-avatar>
  
              <v-list-item-content>
                <v-list-item-title >{{ item.Firstname }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.jobs.companyjob }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

                  </template> -->
                 <!-- </v-list> -->

                 <template v-slot:item="{ item, on, attrs }">
               <v-list-item v-on="on" v-bind="attrs" #default="{ active }">
                  <!-- <v-list-item-action>
                     
                  </v-list-item-action> -->
                  <v-list-item-avatar>
                <v-img :src="path + item.avatar"></v-img>
              </v-list-item-avatar>
                  <v-list-item-content>
                     <v-list-item-title >{{ item.Firstname }} {{ item.Lastname }}</v-list-item-title>
                     <v-list-item-subtitle>{{ item.jobs.companyjob }}</v-list-item-subtitle>
                  </v-list-item-content>
               </v-list-item>
            </template>




                </v-autocomplete>

                <!-- <v-menu
        v-model="menu"
        location="top start"
        origin="top start"
        transition="scale-transition"
      >
        <template v-slot:activator="{ props }">
          <v-chip
            pill
            v-bind="props"
            link
          >
            <v-avatar start>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>

            John Leider
          </v-chip>
        </template>

       
      </v-menu> -->
              </v-row>

              <v-divider></v-divider>

              <!-- test -->
              <v-text-field v-model="newTask.title" label="Title" required outlined :rules="titleRules"></v-text-field>
              <v-textarea label="Note" v-model="newTask.note" outlined></v-textarea>
              <div class="d-flex justify-end">
                <v-btn plain class="mr-2" @click="cancelButtonClick">Cancel</v-btn>
                <v-btn color="primary" type="submit">Add</v-btn>
              </div>
            </v-form>
          </v-card>
        </v-dialog>
      </v-container>

    </v-main>
  </v-app>
</template>

<script>
import { v4 } from 'uuid';
import axios from 'axios';
import draggable from "vuedraggable";
import config from '../config';
import TaskCard from "@/components/TaskCard.vue";
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
export default {
  name: "notes",
  components: {
    TaskCard,
    draggable,
    Topbar,
    Sidebar,
  },
  data: () => ({

    menu: false,
    drawer: null,
    tasks: [],
    newTask: {
      title: '',
      note: '',
      date: ''
    },
    titleRules: [(value) => Boolean(value) || 'Enter a title'],

    showNewTaskDialog: false,

    Employers: [],
    userdata: JSON.parse(localStorage.getItem("user")),
    path: config.api_url,
  }),
  methods: {
    getItemText(item) {
    return `${item.Firstname} ${item.Lastname}`;
},
    cancelButtonClick() {
      this.showNewTaskDialog = false;
      this.$refs.form.reset();
    },
    newTaskFormSubmit() {
      if (this.$refs.form.validate()) {
        this.tasks.push({
          id: v4(),
          title: this.newTask.title,
          note: this.newTask.note,
          isCompleted: false,
        });
        this.showNewTaskDialog = false;
        this.$refs.form.reset();
      }
    },
    remove(item) {
      let idx = this.Employers.indexOf(item)
      this.Employers.splice(idx, 1)
      this.Employers = [...this.Employers]
    },
  },
  mounted() {
    axios.get(`http://localhost:3000/api/employer/employerCompanyByuser/${this.userdata._id}`)
      .then((response) => {
        //Then injecting the result to datatable parameters.

        this.Employers = response.data;

      }).catch((error) => {
        console.log(error)
      });


  }
};
</script>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}

/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
</style>
