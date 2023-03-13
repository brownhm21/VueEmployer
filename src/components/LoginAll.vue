<template>
  <v-app id="inspire">
    <v-main>
      <div class="pt-15 pl-15  text" >
              <span>
                <a href="/"><i class="fa fa-arrow-left flechaIcon"/>  Home</a>
              </span>
            </div>
      <div class="d-flex align-center justify-center pa-4 pt-20 ">
        <v-card class="auth-card pa-4 pt-7" width="500" elevation="15">
          <!-- <v-card-item>
        <template >
          <div class="d-flex">
            <v-avatar><img src="@/assets/img/logo_copy.svg" /></v-avatar>
            
          </div>
        </template>

        <v-card-title class="text-center text-base font-weight-semibold text-2xl text-uppercase ml-3">
          Employerella
        </v-card-title>

      </v-card-item> -->
          <v-card-title class=" justify-center " height="100">
            <v-avatar rounded="lg" size="100"><img src="@/assets/img/logo_copy.svg" /></v-avatar>
            <span class="text-center text-base font-weight-semibold text-2xl text-uppercase ">Employerella</span>
          </v-card-title>

          <v-card-text class="text-center text-base pt-2">
            <h5 class="text-h5 font-weight-semibold mb-1">
              Adventure starts here 🚀
            </h5>
            <p class="mb-0">
              Make your app management easy and fun!
            </p>
          </v-card-text>

          <v-card-text>
            <v-form ref="formLogin1" @submit.prevent="login" lazy-validation>


              <v-col col="6">
                <v-text-field outlined :label="labels.email" v-model="formLogin.email" type="email"
                  :error-messages="errors.email" :rules="email_Rules" :disabled="loading" @input="clearErrors('email')"
                  prepend-inner-icon="mdi-mail" hide-details />

              </v-col>


              <v-col col="6">
                <v-text-field outlined :label="labels.password" v-model="formLogin.password"
                  :append-icon="passwordHidden ? 'visibility_off' : 'visibility'"
                  @click:append="() => (passwordHidden = !passwordHidden)" :type="passwordHidden ? 'password' : 'text'"
                  :error-messages="errors.password" :disabled="loading" :rules="pwdRules" hint="At least 6 characters"
                  @input="clearErrors('password')" prepend-inner-icon="mdi-lock" hide-details />

              </v-col>

              <v-col col="12" md="6">
                <v-btn block color="teal accent-3" dark type="submit" :loading="loading" :disabled="loading">SIGN
                  IN</v-btn>

              </v-col>
              <v-col col="12" class="text-center text-base">

                <span>Already Don't have an account?</span>
                <RouterLink class="text-primary ms-2" to="RegisterView">
                  Sign up instead
                </RouterLink>


              </v-col>

              <v-col cols="12" class="d-flex align-center">
                <v-divider />
                <span class="mx-4">or</span>
                <v-divider />
              </v-col>

              <v-col cols="12" class=" text-center align-center ">
                <v-btn v-for="link in authProviders" :key="link.icon" :icon="link.icon" variant="text" :color="link.color"
                  :href="link.link" class="mx-2">
                  <v-icon size="30px">{{ link.icon }}</v-icon>

                </v-btn>

              </v-col>

            </v-form>
          </v-card-text>

        </v-card>








      </div>








    </v-main>




  </v-app>
</template>

<script>
import logo from '@/assets/img/logo_copy.svg?raw'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';
import Form from '@/mixins/form';
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
export default {
  name: "app-register",
  mixins: [validationMixin, Form],
  validations: {
    name: { required, minLength: minLength(4) },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirmPassword: { sameAsPassword: sameAs("password") }
  },
  data: () => ({
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
    },
    authProviders: [
      {
        icon: 'mdi-facebook',
        color: '#4267b2',
        colorInDark: '#4267b2',
        link: 'https://twitter.com/_brown21__'
      },
      {
        icon: 'mdi-twitter',
        color: '#1da1f2',
        colorInDark: '#1da1f2',
        link: 'https://twitter.com/_brown21__'
      },
      {
        icon: 'mdi-github',
        color: '#272727',
        colorInDark: '#fff',
        link: 'https://github.com/brownhm21'
      },
      {
        icon: 'mdi-instagram',
        color: '#db4437',
        colorInDark: '#db4437',
        link: 'https://instagram.com/__brown21_'
      },
    ]
  }),
  props: {
    source: String
  },
  components: {
    Navbar,
    Footer,
  },
  methods: {

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

            localStorage.setItem("accessToken", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            this.$router.push("/dashboard");
            this.error = '';
            Swal.fire('Logged In Successfully!', '', 'success');
            
          })
          .catch(err => {
            /*this.handleErrors(err.response.data.errors)
            console.log(err.response)
            this.error = err.response.data.error*/
            Swal.fire({
              icon: 'error',
              title: 'Something went wrong!',
              text: 'Check your E-mail or Password',


            })
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
  computed: {
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
  },
}
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
<style lang="less" scoped>
.text {
       
        
        h1, a {
            font-family: 'Syne';
            font-size: 25px;
            line-height: 26px;
            color: rgb(255, 255, 255);
            text-decoration: none;
        }
       
        p {
            font-family: 'Open Sans';
            font-size: 25px;
            line-height: 25px;
            color: rgba(0, 0, 0, 0.4);
            margin-bottom: 54px;
        }
        @media (min-width: 1367px){
            width: 570px;
        }
        @media (max-width: 1100px){
            width: 570px;
        }
        @media (max-width: 992px){
            width: 570px;
        }
        @media (max-width: 600px){
            width: 100%;
            padding: 0 0px;
        }
        
    }
 @media (max-width: 2000px){
  .v-btn--block{
    display: flex;
    flex: 1 0 auto;
    min-width: 100% !important;
    max-width: none;
  }
           
        }
</style>

 
