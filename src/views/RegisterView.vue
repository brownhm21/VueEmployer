<template>
    <v-app>
      <!-- <navigation :color="primary"  /> -->
      <register />
      
      <v-main >
        <!-- <v-container>

            <div class="d-flex align-center justify-center pa-4">
      <v-card class="auth-card pa-4 pt-7" width="500"  elevation="8">
      <v-card-item class="justify-center">
        <template >
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <v-card-title class="font-weight-semibold text-2xl text-uppercase">
          Employerella
        </v-card-title>
      </v-card-item>
      <v-card-text class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Adventure starts here 🚀
        </h5>
        <p class="mb-0">
          Make your app management easy and fun!
        </p>
      </v-card-text>

      <v-card-text>
        <v-form ref="form" @submit.prevent="submit" lazy-validation v-model="valid">
         
            <v-col col="6">
            <v-text-field outlined :label="labels.name" v-model="form.name" :error-messages="errors.name"
                            :rules="[rules.required('name')]" :disabled="loading" @input="clearErrors('name')"
                            prepend-inner-icon="mdi-account-circle" ></v-text-field>
          </v-col>

          <v-col col="6">
            <v-text-field outlined :label="labels.email" v-model="form.email" type="email"
                            :error-messages="errors.email" :rules="email_Rules" :disabled="loading"
                            @input="clearErrors('email')" prepend-inner-icon="mdi-mail"></v-text-field>
            
          </v-col>

          <v-col col="6">
            <v-text-field outlined :label="labels.password" v-model="form.password"
                            :append-icon="passwordHidden ? 'visibility_off' : 'visibility'"
                            @click:append="() => (passwordHidden = !passwordHidden)"
                            :type="passwordHidden ? 'password' : 'text'" :error-messages="errors.password"
                            :disabled="loading" :rules="pwdRules" hint="At least 6 characters"
                            @input="clearErrors('password')" prepend-inner-icon="mdi-lock"></v-text-field>
            
          </v-col>
          <v-col col="6">
            <v-text-field outlined :label="labels.confirmpassword" v-model="form.confirmpassword"
                            :type="passwordHidden ? 'password' : 'text'" :error-messages="errors.confirmpassword"
                            :disabled="loading" :rules="password_ConfirmationRules" @input="clearErrors('password')"
                            prepend-inner-icon="mdi-lock"></v-text-field>
            
          </v-col>
          <div class="d-flex align-center mt-1 mb-4">
                <v-checkbox
                  id="privacy-policy"
                  inline
                />
                <v-label
                  for="privacy-policy"
                  style="opacity: 1;"
                >
                  <span class="me-1">I agree to</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                  >privacy policy & terms</a>
                </v-label>
              </div>
              <v-col col="12" md="6">
                <v-btn block color="teal accent-3" dark type="submit" :loading="loading"
                              :disabled="loading || !valid">SIGN UP</v-btn>

              </v-col>
         <v-col col="12" class="text-center text-base">
          
              <span>Already have an account?</span>
              <RouterLink
                class="text-primary ms-2"
                to="login"
              >
                Sign in instead
              </RouterLink>


         </v-col>

         <v-col
              cols="12"
              class="d-flex align-center"
            >
              <v-divider />
              <span class="mx-4">or</span>
              <v-divider />
            </v-col>

        </v-form>
      </v-card-text>

      </v-card>





 <v-img
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <v-img
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    
    <v-img
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
    </div>


        </v-container>
         -->
      
         
       <div class="svg-border-waves text-white pt-15">
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
  import register from "@/components/RegisterAll.vue";



 
  export default {
    name: "LoginView",

   
    components: {
      navigation,
      foote,
      register
      
    },
    data: () => ({
      fab: null,

      color: "",
      flat: null,
      ///////////////////////
      drawer: null,
      snackbar: false,
      snackbarText: '',
    passwordHidden: true,
    error: '',
    step: 1,
    pwdRules: [v => !!v || "Password required"],
    pwdConfirm: [
      v => !!v || "Confirm password",
      v => v === this.password || "Passwords do not match"],
    form: {
      name: null,
      email: null,
      password: null,
      confirmpassword: null
    },
    formLogin: {
      email: null,
      password: null,
    }
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
    methods: {
        submit() {
      if (this.$refs.form.validate()) {
        //this.loading = true;
        console.log('object', this.form);
        axios.post('http://localhost:3000/api/user/register', this.form)
          .then((response) => {
            console.log(response.data);
            /*this.$toast.success('You have been successfully registered!')
            this.$emit('success', response.data);
            /*localStorage.setItem("accessToken",response.data)*/
            this.$router.push({ name: "dashboard" })
            this.error = '';
          })
          .catch(err => {
            /*this.handleErrors(err.response.data.errors)
            console.log(err.response)
            this.error = err.response.data.error*/
             // Handle Errors here.
          var errorMessage = error.message;
          this.loading = false;
          if (errorMessage.length > 0) {
            this.snackbarText = errorMessage;
            this.snackbar = true;
          }
          })
          .then(() => {
            this.loading = false
          })
      }
    },
    login() {
      if (this.$refs.formLogin1.validate()) {
       
        this.loading = true;
        console.log('object', this.formLogin);
        axios.post('http://localhost:3000/api/user/login', this.formLogin)
          .then((response) => {
            console.log(response.data);
            //this.$cookie.set('token',res.data.token);
            /*this.$toast.success('You have been successfully registered!')
            /*this.$emit('success', response.data);*/
           localStorage.setItem("accessToken",response.data.token)
           localStorage.setItem("user",JSON.stringify(response.data.user))
            this.$router.push("/dashboard");
            this.error = '';
          })
          .catch(err => {
            /*this.handleErrors(err.response.data.errors)
            console.log(err.response)
            this.error = err.response.data.error*/
            this.loading = false;
            this.snackbarText = error;
            this.snackbar = true;
          })
          .then(() => {
            this.loading = false
          })
      }
    }
     
    },
    computed:{
        nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push("Name must be at least 4 characters long.");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be at least 8 characters long");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.sameAsPassword &&
        errors.push("Password must be at least 8 characters long");
      return errors;
    },
    password_ConfirmationRules() {
      return [
        () => (this.form.password === this.form.confirmpassword) || 'password must match',
        v => !!v || 'Confirmation password is required'
      ];
    },
    email_Rules() {
      return [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ];
    }
    }
  };
  </script>

<style scoped>
.v-main {
  background-image: url("~@/assets/img/Register-2.png");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}


</style>
<style lang="scss">
@use "../@core/scss/pages/page-auth.scss";
</style>
