<template>
    <v-container>


        <v-form ref="form" v-model="valid" lazy-validation
            :style="{ background: $vuetify.theme.themes[theme].formBackground }" class="elevation-5 rounded-lg px-5 py-7">
            <v-row>
                <v-col cols="12">
                    <div class="black--text">Edit Company</div>
                </v-col>
                <v-col cols="4">
                    <v-text-field label="Company Name" v-model="companie.companyName" outlined
                        prepend-inner-icon="mdi-bank" :rules="requiredRules" />
                </v-col>



                <v-col cols="4">
                    <v-text-field label="E-Mail" v-model="companie.companyEmail" outlined :rules="emailRules" disabled
                        prepend-inner-icon="mdi-email-outline" />
                </v-col>
                <v-col cols="4">
                    <v-text-field label="Phone Number" v-model="companie.phoneNumber" outlined counter="10"
                        :rules="numberRules" prepend-inner-icon="mdi-cellphone" />
                </v-col>

                <v-col cols="12">
                    <v-text-field label="Address" v-model="companie.companyAdress" outlined :rules="requiredRules"
                        prepend-inner-icon="mdi-home-variant" />
                </v-col>

                <v-col cols="6">
                    <v-text-field label="City" v-model="companie.companyCity" outlined :rules="requiredRules"
                        prepend-inner-icon="mdi-map-marker-multiple" />
                </v-col>

                <v-col cols="6">
                    <v-text-field label="Zip Code" v-model="companie.zipcode" outlined counter="5" :rules="numberRules"
                        prepend-inner-icon="mdi-map" />
                </v-col>
            </v-row>



            <v-row>
                <v-col cols="6">
                    <v-btn color="primary" @click="update">
                        Update
                    </v-btn>
                    
                </v-col>
                <!-- <v-col cols="6">
                    <v-btn color="deep-purple accent-4" @click="reset">
                        Reset
                    </v-btn>
                </v-col> -->
            </v-row>
        </v-form>






    </v-container>


</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {

    name: "add-tutorial",

    data: () => ({
        userdata: JSON.parse(localStorage.getItem("user")),

        valid: false,
        calenderModal: false,
        formLoading: false,
        companie: {},
        company: {
            companyName: '',
            companyEmail: '',
            phoneNumber: '',
            companyAdress: '',
            companyCity: '',
            zipcode: '',
            createdBy: (JSON.parse(localStorage.getItem("user"))._id) ? { "_id": JSON.parse(localStorage.getItem("user"))._id } : null


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
        show: function () {
            axios.get(`http://localhost:3000/api/company/companyUser/${this.userdata._id}`
            )
                .then(response => {
                    this.companie = response.data;
                })
        },




        update() {
            if (this.$refs.form.validate()) {
                //this.loading = true;
                console.log('object', this.companie);
                // axios.patch(`http://localhost:3000/api/company/update-company/${this.companie._id}`,
                //     {
                //         companyName: this.companie.companyName,
                //         phoneNumber: this.companie.phoneNumber,
                //         companyAdress: this.companie.companyAdress,
                //         companyCity: this.companie.companyCity,
                //     })
                //     .then((response) => {
                //         console.log(response.data);





                //     })
                //     .catch(err => {
                //         console.log('error');
                //     })
                //     .then(() => {
                //         this.loading = false
                //     })

                    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            axios.patch(`http://localhost:3000/api/company/update-company/${this.companie._id}`,
                    {
                        companyName: this.companie.companyName,
                        phoneNumber: this.companie.phoneNumber,
                        companyAdress: this.companie.companyAdress,
                        companyCity: this.companie.companyCity,
                    }).then(res => {
        Swal.fire('Saved!', '', 'success')
        
        console.log(res);




      })
        .catch(err => {
          Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',


                    })
          console.log(err)


        });


        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
            
                }
        },
        reset() {
            this.$refs.form.reset();
        },
        resetValidation() {
            this.companie
        },


    },
    computed: {
        theme() {
            return this.$vuetify.theme.dark ? "dark" : "light";
        }
    },
    created() {
        this.show();
    },
};
</script>

<style>
.submit-form {
    max-width: 300px;
}
</style>