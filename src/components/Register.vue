<template>
    <v-app :style="{ background: $vuetify.theme.themes.dark.background }">
        <Navbar />
        <v-container  fluid>
      <v-row >
    
        <v-col cols="12">
            <v-card class="mx-auto rounded-xl" flat>
            <v-img :src="require('../assets/4pic.jpg')" contain max-height="100%">
                <div class="d-flex align-center auth-bg pt-16 col-lg-4 col ">
                    <v-row>
                        <div class="mx-auto col-sm-8 col-md-6 col-lg-12 col-12 ">
                            <v-card class="v-card--flat v-sheet theme--light">
                                <v-card-text>
                                    <p class="text-2xl font-weight-semibold text--primary mb-2">Register 🚀</p>
                                    <p class="mb-2">Make your app management easy and fun! </p>
                                </v-card-text>

                                <v-card-text>
                                    <v-form @submit="test" lazy-validation>
                                        <v-text-field label="First Name" id="firstname" v-model="formvalues.firstname" :rules="nameRules" ></v-text-field>
                                        <v-text-field label="Last Name" id="Lastname" v-model="formvalues.lastname" :rules="nameRules"></v-text-field>
                                        <v-text-field label="Email" id="email" v-model="formvalues.email" :rules="emailRules"></v-text-field>
                                        <v-text-field label="Password" id="password" v-model="formvalues.password" type="password" :rules="passwordRules"></v-text-field>
                                        <v-text-field id="retypepassword" v-model="formvalues.retypepassword" :rules="passwordRules"  type="password" label="Re-type Password"  required  ></v-text-field>
                                        

                                        <v-checkbox v-model="firstcheckbox" :rules="[v => !!v || 'You must agree to continue!']" label="I agree with Terms and Conditions" required></v-checkbox>
                                        
                                        <v-btn class="purple darken-2 white--text mt-5" type="submit">    Register  </v-btn>
                                    </v-form>
                                   
                                </v-card-text>

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


export default {
name: "app-register",

data(){
    return{
        formvalues:{
            firstname: '',
    lastname: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    retypepassword: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter',
    ],
    firstcheckbox: false,
    seccheckbox: false,
        }
    }



},
 
components: {
    Navbar,
    Footer,
  },
  methods: {
    submitForm () {
    this.$refs.form.validate();
  },

  test(event){
    event.preventDefault()
    console.log('only test',this.formvalues);
  }
    
  },
  computed: {
   

}
  
}


</script>

<style lang="css" scoped>
</style>