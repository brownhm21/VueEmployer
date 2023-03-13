<template>
    <v-app-bar app elevate-on-scroll elevation="3" color="white">
      <v-app-bar-nav-icon @click="$emit('drawerEvent')"></v-app-bar-nav-icon>
      <v-spacer />
      <v-col lg="6" cols="12">
        <v-form>
          <v-text-field
            class="p-0 m-0 mt-6"
            full-width
            dense
            append-icon="mdi-magnify"
            outlined
            rounded
            placeholder="Search"
          />
        </v-form>
      </v-col>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <span
            class="mx-5 mr-10"
            style="cursor: pointer"
            v-bind="attrs"
            v-on="on"
          >
            <v-badge content="3" color="red" offset-y="10" offset-x="10">
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </span>
        </template>
        <v-list three-line width="250">
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              v-text="item.header"
            ></v-subheader>
  
            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>
  
            <v-list-item v-else :key="item.title">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
  
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <span style="cursor: pointer" v-bind="attrs" v-on="on">
            <v-chip link>
              <v-badge dot bottom color="green" offset-y="10" offset-x="10">
                <v-avatar size="40">
                  <v-img src="https://images.pexels.com/photos/6893943/pexels-photo-6893943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                </v-avatar>
              </v-badge>
              <span class="ml-3">{{ user.name }}</span>
              <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
            </v-chip>
          </span>
        </template>
        <v-list width="250" class="py-0">
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://images.pexels.com/photos/6893943/pexels-photo-6893943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </v-list-item-avatar>
  
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item-group   color="primary" >
        <v-list-item v-for="(menu, i) in menus" :key="i" @click="menuActionClick(menu.action)">
          <v-list-item-icon>
            <v-icon v-text="menu.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="menu.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
          
        </v-list>
      </v-menu>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: "Topbar",
    mounted() {
    
    this.$http.get('http://localhost:3000/api/posts')
      .then(res => {
        this.name = res.data.user.name;
        this.email = res.data.user.email;
      })
  },
    data() {
      return {
        name: '',
        email: '',
        user:JSON.parse(localStorage.getItem("user")),
        menus: [
          { title: "Profile", icon: "mdi-account" ,action: "profileEdit"},
          { title: "Change Password", icon: "mdi-key" ,action: "test"},
          { title: "Setting", icon: "mdi-cog" ,action: "test"},
          { title: "Logout", icon: "mdi-logout" ,action: "logout"},
        ],
        items: [
          {
            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
            title: "Brunch this weekend?",
            subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          },
          { divider: true, inset: true },
          {
            avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
          },
          { divider: true, inset: true },
          {
            avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
            title: "Oui oui",
            subtitle:
              '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
          },
          { divider: true, inset: true },
          {
            avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
            title: "Birthday gift",
            subtitle:
              '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
          },
          { divider: true, inset: true },
          {
            avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
            title: "Recipe to try",
            subtitle:
              '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          },
        ],
      };
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
      } else if (action === "logout") {

      
        localStorage.clear();
        this.$router.push('/LoginView');
        alert('LOGOUT!!')
      }else if (action === "profileEdit") {
      
        this.$router.push('/ProfileEdit');
        alert('CompanyForm!!')
      }
    }
    },
    created() {
      
    
  },
  };
  </script>
  
  <style scoped></style>