<template>
    <v-app>
      <navigation :color="primary"  />
      <login />
      
      <v-main >
    
       <div class="svg-border-waves text-white pt-20">
        <v-img src="~@/assets/img/borderWavesBlue.svg"/>
      </div>
        </v-main>
        
      
      <foote />
    </v-app>
  </template>
  <style scoped>
  
  </style>
  
  <script>
  import navigation from "@/components/Navigation.vue";
  import foote from "@/components/Footer.vue";
  import login from "@/components/LoginAll.vue";



 
  export default {
    name: "LoginView",

   
    components: {
      navigation,
      foote,
      login
      
    },
    data: () => ({
      fab: null,

      color: "",
      flat: null,
      ///////////////////////
      drawer: null,
      snackbar: false,
      snackbarText: '',
    
    error: '',
    step: 1,
    
    
    }),
    props: {
    source: String
  },
    created() {
      const top = window.pageYOffset || 0;
      if (top <= 60) {
        this.color = "transparent";
        this.flat = true;
      }
    },
    watch: {
      fab(value) {
        if (value) {
          this.color = "secondary";
          this.flat = false;
        } else {
          this.color = "transparent";
          this.flat = true;
        }
      },
    },
  
  };
  </script>

<style scoped>
.v-main {
  background-image: url("~@/assets/img/login.png");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>
<style lang="scss">
@use "../@core/scss/pages/page-auth.scss";
</style>