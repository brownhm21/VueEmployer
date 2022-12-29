<template>
    <v-navigation-drawer v-model="drawer" app>
      <v-img
        height="140"
        class="pa-4"
        src="https://images.pexels.com/photos/4269495/pexels-photo-4269495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      >
        <div class="text-center">
          <v-avatar class="mb-4" color="grey darken-1" size="64">
            <v-img
              aspect-ratio="30"
              src="https://images.pexels.com/photos/6893943/pexels-photo-6893943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </v-avatar>
          <h2 class="white--text">{{ user.name }}</h2>
        </div>
      </v-img>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(link, i) in links" :key="i" @click="menuActionClick(link.action)">
          <v-list-item-icon>
            <v-icon v-text="link.icon"></v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  
  export default {
    name: "Sidebar",
    props: ["drawer"],
    data() {
      return {
        name: '',
        email: '',
        user:JSON.parse(localStorage.getItem("user")),
        links: [
        

          { title: "Dashboard", icon: "mdi-microsoft-windows" ,action: "Dashboard"},
          { title: "Profile", icon: "mdi-account" ,action: "company"},
          { title: "Notes", icon: "mdi-microsoft-windows" ,action: "Notes"},
          { title: "Employers", icon: "mdi-card-account-details-outline" ,action: "Employers"},
          { title: "System", icon: "mdi-cog" ,action: "Notes"},
          
          
        ],
      };
    },
    mounted() {
    
    this.$http.get('http://localhost:3000/api/posts')
      .then(res => {
        this.name = res.data.user.name;
        this.email = res.data.user.email;
      })
  },
  methods:{
      getMenu(menu){
        console.log(menu)
        if(menu.id == 1){
          
        }
      },
      menuActionClick(action) {
      if (action === "test") {
        alert('TEST!!')
      } else if (action === "Dashboard") {
       
        this.$router.push('/dashboard');
        
      }else if (action === "company") {
      
        this.$router.push('/CompanyForm');
        alert('CompanyForm!!')
      }
    }
    },
    created() {
      
    
  },
  };
  </script>
  
  <style scoped></style>