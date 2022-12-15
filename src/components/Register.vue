<template>
    <v-app :style="{ background: $vuetify.theme.themes.dark.background }">
        <Navbar />
        <v-container  fluid>
      <v-row >
    
        <v-col cols="12">
            <v-card class="mx-auto rounded-xl" flat>
            <v-img :src="require('../assets/4pic.jpg')" contain max-height="100%">
                <div class="d-flex align-center auth-bg pt-16 col-lg-4 col ">
                    <v-row class="rounded-xl">
                        <div class="mx-auto col-sm-8 col-md-6 col-lg-12 col-12 ">
                            <v-card class="v-card--flat v-sheet theme--light">
                                <v-card-text>
                                    <p class="text-2xl font-weight-semibold text--primary mb-2">Register 🚀</p>
                                    <p class="mb-2">Make your app management easy and fun! </p>
                                </v-card-text>

                                <v-card-text>
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
      :label="labels.password_confirmation"
      v-model="form.password_confirmation"
      :type="passwordHidden ? 'password' : 'text'"
      :error-messages="errors.password_confirmation"
      :disabled="loading"
      :rules="password_ConfirmationRules"
      @input="clearErrors('password')"
            prepend-icon="mdi-lock"
            
    ></v-text-field>

    <v-layout row class="mt-4 mx-0">
      <v-spacer></v-spacer>

      <v-btn
        text
        :disabled="loading"
        :to="{ name: 'home' }"
        color="grey darken-2"
        exact
      >
        Back to login
      </v-btn>

      <v-btn
        type="submit"
        :loading="loading"
        :disabled="loading || !valid"
        color="primary"
        class="ml-4"
      >
        Register
      </v-btn>
    </v-layout>
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

                            </v-card>

                        </div>


                    </v-row>

                </div>
              

            </v-img>
          </v-card>
        </v-col>
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
    
      pwdRules: [v => !!v || "Password required"],
      pwdConfirm: [
        v => !!v || "Confirm password",
        v => v === this.password || "Passwords do not match"  ],
    form: {
      name: null,
      email: null,
      password: null,
      password_confirmation: null
    }
  }),

 
components: {
    Navbar,
    Footer,
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        
        console.log('object',this.form);
        /*axios.post(api.path('register'), this.form)
          .then(res => {
            this.$toast.success('You have been successfully registered!')
            this.$emit('success', res.data)
          })
          .catch(err => {
            this.handleErrors(err.response.data.errors)
          })
          .then(() => {
            this.loading = false
          })*/
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
        () => (this.form.password === this.form.password_confirmation) || 'password must match',
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