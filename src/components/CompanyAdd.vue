<template>
      <v-container>
         <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            :style="{background: $vuetify.theme.themes[theme].formBackground}"
            class="elevation-5 rounded-lg px-5 py-7">
            <v-row>
               <v-col cols="12">
                  <div class="black--text">Company</div>
               </v-col>
               <v-col cols="4" >
                  <v-text-field
                     label="Company Name"
                     v-model="formData.companyName"
                     outlined
                     prepend-inner-icon="mdi-bank"
                     :rules="requiredRules"/>
               </v-col>

               

               <v-col cols="4" >
                  <v-text-field
                     label="E-Mail"
                     v-model="formData.companyEmail"
                     outlined
                     :rules="emailRules"
                     prepend-inner-icon="mdi-email-outline" />
               </v-col>
               <v-col cols="4" >
                  <v-text-field
                     label="Phone Number"
                     v-model="formData.phoneNumber"
                     outlined
                     counter="10"
                     :rules="numberRules"
                     prepend-inner-icon="mdi-cellphone" />
               </v-col>

               <v-col cols="12" >
                  <v-text-field
                     label="Address"
                     v-model="formData.companyAdress"
                     outlined
                     
                     :rules="requiredRules"
                     prepend-inner-icon="mdi-home-variant" />
               </v-col>

               <v-col cols="6" >
                  <v-text-field
                     label="City"
                     v-model="formData.companyCity"
                     outlined
                    
                     :rules="requiredRules"
                     prepend-inner-icon="mdi-map-marker-multiple" />
               </v-col>

               <v-col cols="6" >
                  <v-text-field
                     label="Zip Code"
                     v-model="formData.zipcode"
                     outlined
                     counter="5"
                     :rules="numberRules"
                     prepend-inner-icon="mdi-map" />
               </v-col>
            </v-row>
            
            
            
            <v-row>
               <v-col cols="12">
                  <v-btn
                     color="primary"
                     @click="validate"
                     >
                     Submit
                  </v-btn>
               </v-col>
            </v-row>
         </v-form>
      </v-container>
      
 
  </template>
  
  <script>
 import axios from 'axios';
  
  export default {
    name: "add-tutorial",
    data: () => ({
    valid: false,
    calenderModal: false,
    formLoading: false,
    formData: {
      companyName:'',
      companyEmail:'',
      phoneNumber:'',
      companyAdress:'',
      companyCity:'',
      zipcode:'',
      createdBy:(JSON.parse(localStorage.getItem("user"))._id) ? {"_id":JSON.parse(localStorage.getItem("user"))._id} : null


    },
    requiredRules: [(v) => !!v || "Please fill out this field!"],
    numberRules: [
      (v) => !!v || "Please fill out this field!",
      (v) => Number.isInteger(Number(v)) || "Please enter numbers only!"
    ],
    emailRules: [
      (v) => !!v || "Please fill out the field!",
      (v) =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ]
  }),
  methods: {
   
    
    validate() {
      if (this.$refs.form.validate()) {
        //this.loading = true;
        console.log('object', this.formData);
        axios.post('http://localhost:3000/api/company/registerCompany', this.formData)
          .then((response) => {
            console.log(response.data);

            this.$toast.success('You have been successfully registered!')
            this.$emit('success', response.data);
        
          

          })
          .catch(err => {
        console.log('error');
          })
          .then(() => {
            this.loading = false
          })
      }
    },
    
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  }
  };
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
  }
  </style>