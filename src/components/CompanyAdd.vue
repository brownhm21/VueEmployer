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
                     v-model="formData.CompanyName"
                     outlined
                     prepend-inner-icon="mdi-bank"
                     :rules="requiredRules"/>
               </v-col>

               

               <v-col cols="4" >
                  <v-text-field
                     label="E-Mail"
                     v-model="formData.email"
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
                     v-model="formData.address"
                     outlined
                     
                     :rules="requiredRules"
                     prepend-inner-icon="mdi-home-variant" />
               </v-col>

               <v-col cols="6" >
                  <v-text-field
                     label="City"
                     v-model="formData.city"
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
 
  
  export default {
    name: "add-tutorial",
    data: () => ({
    valid: false,
    calenderModal: false,
    formLoading: false,
    formData: {
      CompanyName:'',
      email:'',
      phoneNumber:'',
      address:'',
      city:'',
      zipcode:'',


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
    deleteRow(index) {
      this.formData.jobs.splice([index], 1);
    },
    addRow() {
      this.formData.jobs.push({});
    },
    moveUp(index) {
      let temp1 = this.formData.jobs[index];
      let temp2 = this.formData.jobs[index - 1];
      this.$set(this.formData.jobs, index, temp2);
      this.$set(this.formData.jobs, index - 1, temp1);
    },
    moveDown(index) {
      let temp1 = this.formData.jobs[index];
      let temp2 = this.formData.jobs[index + 1];
      this.$set(this.formData.jobs, index, temp2);
      this.$set(this.formData.jobs, index + 1, temp1);
    },
    validate() {
      if (this.$refs.form.validate()) {
        console.log("submit");
        this.formLoading = true;
        // Timeout Function only for showing loading progress
        console.log('OBJECT',this.formData);
        /*setTimeout(() => {
          alert(JSON.stringify(this.formData));
          this.formLoading = false;
          console.log(this.formData);
          this.reset();
        }, 4000);*/
      }
    },
    validateDate(dateRange, index) {
      if (dateRange.length === 2) {
        this.calenderModal = false;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
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