<template>
  <v-app :style="{ background: $vuetify.theme.themes.dark.background }">
    <Navbar />
      <v-container class="fill-height" fluid>
        <v-row :align="center" justify="center">
          <v-img :src="require('../assets/4pic.jpg')" contain max-height="100%">
          <v-col cols="12" sm="8" md="8" class="w-25 p-3" style="height: 10%;
          margin-top: 5%;
          margin-left: 5%;">
            <v-card class="elevation-12 rounded-xl">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">Sign in to Employerella</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form ref="form" @submit.prevent="submit" lazy-validation v-model="valid">
                          

    <v-text-field
    :label="labels.email"
      v-model="form.email"
      type="email"
      :error-messages="errors.email"
      :rules="email_Rules"
      :disabled="loading"
      @input="clearErrors('email')"
            prepend-icon="mdi-mail"
    ></v-text-field>

    <v-text-field
    :label="labels.password"
      v-model="form.password"
      :append-icon="passwordHidden ? 'visibility_off' : 'visibility'"
      @click:append="() => (passwordHidden = !passwordHidden)"
      :type="passwordHidden ? 'password' : 'text'"
      :error-messages="errors.password"
      :disabled="loading"
      :rules="pwdRules"
      hint="At least 6 characters"
      @input="clearErrors('password')"
            prepend-icon="mdi-lock"
            
    ></v-text-field>

    

                        </v-form>
                        <h3 class="text-center mt-4">Forgot your password ?</h3>
                      </v-card-text>
                      <div class="text-center mt-3" style="padding: 10%;">
                        <v-btn rounded color="teal accent-3" dark>SIGN IN</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hello, Friend!</h1>
                        <h5
                          class="text-center"
                        >Enter your personal details and start journay with us</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5
                          class="text-center"
                        >To Keep connected with us please login with your personnel info</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">Create Account</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form ref="form" @submit.prevent="submit" lazy-validation v-model="valid">
                          <v-text-field
    :label="labels.name"
      v-model="form.name"
      :error-messages="errors.name"
      :rules="[rules.required('name')]"
      :disabled="loading"
      @input="clearErrors('name')"
            prepend-icon="mdi-account-circle"
    ></v-text-field>

    <v-text-field
    :label="labels.email"
      v-model="form.email"
      type="email"
      :error-messages="errors.email"
      :rules="email_Rules"
      :disabled="loading"
      @input="clearErrors('email')"
            prepend-icon="mdi-mail"
    ></v-text-field>

    <v-text-field
    :label="labels.password"
      v-model="form.password"
      :append-icon="passwordHidden ? 'visibility_off' : 'visibility'"
      @click:append="() => (passwordHidden = !passwordHidden)"
      :type="passwordHidden ? 'password' : 'text'"
      :error-messages="errors.password"
      :disabled="loading"
      :rules="pwdRules"
      hint="At least 6 characters"
      @input="clearErrors('password')"
            prepend-icon="mdi-lock"
            
    ></v-text-field>

    <v-text-field
      :label="labels.confirmpassword"
      v-model="form.confirmpassword"
      :type="passwordHidden ? 'password' : 'text'"
      :error-messages="errors.confirmpassword"
      :disabled="loading"
      :rules="password_ConfirmationRules"
      @input="clearErrors('password')"
            prepend-icon="mdi-lock"
            
    ></v-text-field>
    <v-spacer></v-spacer>
    <div class="text-center mt-n5"  style="padding: 5%; display: flex; justify-content: space-between;">
                        <v-btn rounded color="teal accent-3" dark  type="submit" :loading="loading" :disabled="loading || !valid">SIGN UP</v-btn>
                        <v-btn  text :disabled="loading" @click="step--" rounded color="grey darken-2" exact >Back to login</v-btn>
                      </div>

                        </v-form>
                      </v-card-text>
                      

                      <v-divider></v-divider>
            
                                <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
                                    <span class="me-2">Already have an account?</span>
                                    <a>Sign in instead</a>
                                    
                                </v-card-text>
                                <v-card-text class="v-card__text d-flex align-center mt-2">
                                    <v-divider role="separator" aria-orientation="horizontal" class="theme--light"></v-divider>
                                    <span class="mx-5">or</span>
                                    <v-divider role="separator" aria-orientation="horizontal" class="theme--light"></v-divider>
                                </v-card-text>


                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-img>
        </v-row>
      </v-container>
      <Footer />
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';

import Form from '@/mixins/form';

import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";

export default {
name: "app-register",
mixins: [validationMixin,Form],

validations: {
    name: { required, minLength: minLength(4) },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirmPassword: { sameAsPassword: sameAs("password") }
  },

  data: () => ({
    passwordHidden: true,
    step: 1,
      pwdRules: [v => !!v || "Password required"],
      pwdConfirm: [
        v => !!v || "Confirm password",
        v => v === this.password || "Passwords do not match"  ],
    form: {
      name: null,
      email: null,
      password: null,
      confirmpassword: null
    }
  }),

  props: {
    source: String
  },

 
components: {
    Navbar,
    Footer,
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        //this.loading = true;
        console.log('object',this.form);
        axios.post('http://localhost:3000/api/user/register', this.form )
          .then( (response) => {
    console.log(response.data);
    
            this.$toast.success('You have been successfully registered!');
            this.$emit('success', res.data);
            
          })
          .catch(err => {
            this.handleErrors(err.response.data.errors)
          })
          .then(() => {
            this.loading = false
          })
      }
    },
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
    email_Rules(){
      return [
             (v) => !!v || 'E-mail is required',
             (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ];
    }

  },
  
}
</script>

<style lang="css" scoped>
</style>