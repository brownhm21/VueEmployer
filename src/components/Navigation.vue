<template>
    <div>
      <v-navigation-drawer
        v-model="drawer"
        app
        temporary
        dark
        src="@/assets/img/bgDrawer.jpg"
      >
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="@/assets/img/logo2.png" alt="Logo" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title">Eployerella</v-list-item-title>
              <v-list-item-subtitle>WEB</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
  
        <v-divider />
  
        <v-list dense>
          <v-list-item
            v-for="(item, i) in items" :key="i" link @click="menuActionClick(item.action)">
            <v-list-item-icon class="justify-center">
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitile-1" v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar
        app
        :color="color"
        :flat="flat"
        dark
        class="px-15"
        :class="{ expand: flat }"
      >
        <v-toolbar-title>
          <v-img src="@/assets/img/logo2.png" max-width="50px" />
        </v-toolbar-title>
        <v-spacer />
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="mr-4"
          v-if="isXs"
        />
        <div v-else>
          <v-btn text @click="$vuetify.goTo('#hero')">
            <span class="mr-2">Home</span>
          </v-btn>
          <v-btn text @click="$vuetify.goTo('#features')">
            <span class="mr-2">About</span>
          </v-btn>
          <v-btn text @click="$vuetify.goTo('#download')">
            <span class="mr-2">Download</span>
          </v-btn>
          <v-btn text @click="$vuetify.goTo('#pricing')">
            <span class="mr-2">Prices</span>
          </v-btn>
          <v-btn text @click="$router.push('/Register')">
            <span class="mr-2">Create Account</span>
          </v-btn>
          <v-btn rounded outlined text @click="$vuetify.goTo('#contact')">
            <span class="mr-2">Contact Us</span>
          </v-btn>
        </div>
      </v-app-bar>
    </div>
  </template>
  
  <style scoped>
  .v-toolbar {
    transition: 0.6s;
  }
  .expand {
    height: 80px !important;
    padding-top: 10px;
  }
  </style>
  
<script>
  export default {
    data: () => ({
      drawer: null,
      isXs: false,
      items: [
        { title:"Home", icon:"mdi-home-outline", link:"#hero", action:"hero"},
        {icon:"mdi-information-outline", title:"About", link:"#features" , action:"about"},
        {icon:"mdi-download-box-outline", title:"Download", link:"#download",  action:"download"},
        {icon:"mdi-card-account-details-outline", title:"Register", link:"register",  action:"register"},
        {icon:"mdi-currency-usd", title:"Pricing", link:"#pricing", action:"pricing"},
        {icon:"mdi-email-outline", title:"Contact", link:"#contact", action:"contact"},
      ],
    }),
    props: {
      color: String,
      flat: Boolean,
    },
    methods: {
      onResize() {
        this.isXs = window.innerWidth < 850;
      },
      menuActionClick(action) {
      if (action === "hero") {
        this.$vuetify.goTo('#hero')
        
      } else if (action === "about") {
       
        this.$vuetify.goTo('#about')
        
      }else if (action === "download") {
      
        this.$vuetify.goTo('#download')
      }else if (action === "register") {
        console.log('push employer')
       
       this.$router.push('Register');
       
     }else if (action === "pricing") {
        this.$vuetify.goTo('#pricing')
       
     }else if (action === "contact") {
        this.$vuetify.goTo('#contact')
       
     }
    }
    },
    watch: {
      isXs(value) {
        if (!value) {
          if (this.drawer) {
            this.drawer = false;
          }
        }
      },
    },
    mounted() {
      this.onResize();
      window.addEventListener("resize", this.onResize, { passive: true });
    },
  };
  </script>