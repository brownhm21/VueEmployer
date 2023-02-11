<template>

    <v-app :style="{ background: $vuetify.theme.themes[theme].background }">

        <Sidebar :drawer="drawer" />
        <Topbar @drawerEvent="drawer = !drawer" />



        <v-main class="py-8 px-9 " fluid style="background: #f5f5f540">
            <v-progress-linear :active="formLoading" indeterminate top absolute
                color="primary accent-4"></v-progress-linear>
            <v-container class="pt-12">
                <v-form ref="form" v-model="valid" lazy-validation
                    :style="{ background: $vuetify.theme.themes[theme].formBackground }"
                    class="elevation-5 rounded-lg px-5 py-7 pt-20">
                    <v-row>
                        <v-col cols="12">
                            <div class="headline">Employer</div>
                        </v-col>
                        <v-col cols="12" md="6" class="mb-0">
                            <v-text-field label="First Name" v-model="firstName" outlined
                                prepend-inner-icon="mdi-account-arrow-right-outline" :rules="requiredRules" />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field label="Last Name" v-model="lastName" outlined
                                prepend-inner-icon="mdi-account-arrow-left-outline" :rules="requiredRules" />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field label="E-Mail" v-model="email" outlined :rules="emailRules"
                                prepend-inner-icon="mdi-email-outline" />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field label="Phone Number" v-model="phoneNumber" outlined counter="10"
                                :rules="numberRules" prepend-inner-icon="mdi-cellphone" />
                        </v-col>

                        <v-col cols="12">
                            <v-text-field label="Address" v-model="address" outlined :rules="requiredRules"
                                prepend-inner-icon="mdi-home-variant" />
                        </v-col>

                        <v-col cols="6">
                            <v-text-field label="City" v-model="city" outlined :rules="requiredRules"
                                prepend-inner-icon="mdi-map-marker-multiple" />
                        </v-col>

                        <v-col cols="6">
                            <v-text-field label="Zip Code" v-model="zipcode" outlined counter="5" :rules="numberRules"
                                prepend-inner-icon="mdi-map" />
                        </v-col>



                    </v-row>
                    <v-row class="mb-0">
                        <v-col cols="12">
                            <div class="headline">Jobs</div>
                        </v-col>
                    </v-row>
                    <v-btn small text color="primary" class="ml-2" disabled>
                        <v-icon>mdi-briefcase-plus</v-icon>
                        <span>add</span>
                    </v-btn>
                    <v-row class="rounded mb-2 mx-0" style="border: 1px solid lightgrey;">
                        <v-col cols="12" md="3">
                            <v-autocomplete v-model="jobs.level" :items="positions" label="Level"
                                prepend-icon="mdi-domain" :rules="requiredRules" />
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field label="Company Job" v-model="jobs.company" :rules="requiredRules"
                                hint="The name is quite enough." prepend-icon="mdi-wallet-travel" />
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-autocomplete v-model="jobs.companyName" label="Company Name" prepend-icon="mdi-domain"
                                :rules="requiredRules" item-value="_id" item-text="companyName" :items="companies" />
                        </v-col>



                        <v-col cols="12" md="4" v-if="jobs.level === 'Trainee'">
                            <v-dialog ref="dialog" v-model="calenderModal" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="jobs.dateRange" label="Employment period"
                                        prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                        :rules="requiredRules"></v-text-field>
                                </template>
                                <v-date-picker v-model="jobs.dateRange" type="month" range>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary"
                                        @click="(calenderModal = false); (jobs.dateRange = null);">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="validateDate(jobs.dateRange)">
                                        Save
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>

                        <!-------
                            <v-col cols="12" md="1" class="d-flex justify-center align-center mx-0 px-0">
                            <v-btn icon small color="primary" :disabled="index === 0" @click="moveUp(index)">
                                <v-icon>mdi-menu-up</v-icon>
                            </v-btn>
                            <v-btn icon small color="primary"
                                :disabled="index === Object.keys(jobs).length - 1" @click="moveDown(index)">
                                <v-icon>mdi-menu-down</v-icon>
                            </v-btn>
                            <v-btn icon small color="red" :disabled="Object.keys(jobs).length === 1"
                                @click="deleteRow(index)">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-col>
                            
                            
                            -------->
                    </v-row>
                    <!-- <v-row> -->
                    <!-------

                            <v-col cols="12" md="4">
                        <upload-image />

                        </v-col>
                            ---------->

                    <!-- <v-col  >
                        <upImage />

                        </v-col> -->

                    <!-- </v-row> -->
                    <v-row class="mb-0">
                        <v-col cols="12">
                            <div class="headline">Profile Picture</div>
                        </v-col>
                    </v-row>

                    <v-row class="rounded mb-2 mx-0 " style="border: 1px solid lightgrey;">
                        <v-col cols="12" md="1">
                            <v-img :src="imagePreviewURL" class="pa-10 secondary rounded-circle d-inline-block"
                                style="max-height: 30px; max-width: 30px" />

                        </v-col>

                        <v-col cols="12" md="3">
                            <!-- <input class="input" show-size type="file" label="Upload Profile Picture" outlined dense
                                @change="logoSelected" accept="image/*" color="primary" /> -->

                                <div class="d-flex flex-wrap gap-1">
                      <v-btn color="primary" @click="$refs.refInputEl?.click()" >
                        <v-icon icon="mdi-cloud-upload-outline" class="d-sm-none" />
                        <span class="d-none d-sm-block">Upload new photo</span>
                      </v-btn>

                      <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden @change="logoSelected">

                      
                    </div>


                        </v-col>
                        <!-- <v-col cols="12" md="3">
                            <v-input show-size type="file" label="Upload Profile Picture" outlined dense
                                @change="logoSelected" accept="image/*" color="primary"  />


                        </v-col> -->
                        <!-- <v-col cols="12" md="2">
                            <v-btn flat color="success" @click="onUpload" outlined rounded text>Upload</v-btn>
                        </v-col> -->
                        <v-col cols="12" sm="20">
                            <v-btn flat type="reset" color="error" @click="resetPreview" outlined rounded
                                text>Reset</v-btn>
                        </v-col>
                        <div v-if="progress">
                            <div>
                                <v-progress-linear v-model="progress" color="light-blue" height="25" reactive>
                                    <strong>{{ progress }} %</strong>
                                </v-progress-linear>
                            </div>

                        </div>

                        <div class="pa-2">
                            <v-alert v-if="message" border="left" color="blue-grey" dark>
                                {{ message }}
                            </v-alert>
                        </div>



                        <!-- <div class="d-flex flex-wrap gap-2">
              <v-btn
                color="primary"
                @click="refInputEl?.click()"
              >
                <v-icon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Upload new photo</span>
              </v-btn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="logoSelected"
              >

              <v-btn
                type="reset"
                color="error"
                variant="tonal"
                @click="resetPreview"
              >
                <span class="d-none d-sm-block">Reset</span>
                <v-icon
                  icon="mdi-refresh"
                  class="d-sm-none"
                />
              </v-btn>
            </div> -->






                    </v-row>
                    <v-row>
                        <v-col sm="12">
                            <v-alert v-if="responseSuccess" dense text type="success">
                                You have successfully added member.
                            </v-alert>
                        </v-col>
                    </v-row>



                    <v-row>
                        <v-col cols="12">
                            <v-btn color="primary" @click="submitForm">
                                Submit
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
            <!-- <div class="caption mt-10">{{ formData }}</div>
            <div class="caption mt-10">{{ jobs }}</div>
            <div class="caption mt-10">{{ companies }}</div> -->

        </v-main>
    </v-app>

</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import UploadImage from "@/components/UploadImage.vue";
import UpImage from "@/components/UpImage.vue";
import axios from 'axios';
import api from "@/services/apiService";

export default {
    name: 'employerAdd',




    data: () => ({
        ////////////for image upload
        image: '',
        createdByu: (JSON.parse(localStorage.getItem("user"))._id) ? { "_id": JSON.parse(localStorage.getItem("user"))._id } : null,
        jobs: {
            company: '',
            level: '',
            companyName: '',
            dateRange: null
        },
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        zipcode: '',
        // to save image url
        imageUrl: '',
        imagePreviewURL: null,
        imagePreview: '',
        progress: 0,
        message: "",
        currentImage: undefined,
        previewImage: null,
        ///////////////////////////
        //file: null,
        profilePicture: '',
        picture: '',
        //////////////////////
        responseSuccess: false,


        drawer: null,
        valid: false,
        calenderModal: false,
        formLoading: false,
        positions: [
            "Trainee",
            "Working Student",
            "Intern",
            "Junior",
            "Senior",
            "V-Level",
            "C-Level"
        ],
        //////////////////////////
        userdata: JSON.parse(localStorage.getItem("user")),
        createdhah: JSON.parse(localStorage.getItem("user"))._id,
        ////////////////////
        company: 0,
        companies: [],
        // formData: {
        // },
        formDataa: {},
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
        ],
        /*createdByu:(JSON.parse(localStorage.getItem("user"))._id) ? {"_id":JSON.parse(localStorage.getItem("user"))._id} : null,
        companyBy:(JSON.parse(localStorage.getItem("company"))._id) ? {"_id":JSON.parse(localStorage.getItem("company"))._id} : null,
        */

    }),
    methods: {
        /////////////////////////////////
        logoSelected(e) {
            this.image = e.target.files[0];

            let reader = new FileReader();
            reader.readAsDataURL(this.image);
            reader.onload = (e) => {
                this.imagePreviewURL = e.target.result;
            };
            this.message = " Image Selected!";

        },
        ////////////////////////////////////////////
        uploadFile() {
            const input = this.$refs.fileInput;
            this.file = input.files[0];
            console.log(this.file)
            // do something with the file
        },
        /*showCompany: function () {
            axios.get(`http://localhost:3000/api/company/companyUserr/${this.userdata._id}`
            )
                .then(response => {
                    this.companies = response.data.companies;
                })
        },*/
        /////////////get companies
        getCompanies: function () {
            axios.get(`http://localhost:3000/api/company/companyUser/${this.userdata._id}`)
                .then(function (response) {
                    this.companies = response.data;
                }.bind(this));
        },
        /////////////////////////////////////

        handleFileChange(event) {
            const file = event.target.files[0];
            // Do something with the file, such as upload to a server
            this.profilePicture = URL.createObjectURL(file);

        },
        updatePicture(event) {
            const file = event.target.files[0];
            this.picture = URL.createObjectURL(file);
            console.log(this.picture)
            console.log(event)
        },
        ///////////////////////////////////////////
        onChange(image) {
            console.log('New picture selected!')
            if (image) {
                console.log('Picture loaded.')
                this.image = image
            } else {
                console.log('FileReader API not supported: use the <form>, Luke!')
            }
        },
        ////////////////////////////////
        createImage(file) {
            const reader = new FileReader();


            reader.onload = (e) => {
                this.imageUrl = e.target.result;
                console.log(e.target.files[0])
            };
            reader.readAsDataURL(file);
        },
        onFileChange(event) {

            this.image = event.target.files[0];
            this.imageUrl = URL.createObjectURL(file);
            console.log(e.target.value);
            // this.image = URL.createObjectURL(file);
            // if (!file) {
            //     this.message = "Please select an Image!";
            //     return;
            // }
            // this.createImage(file);
            this.message = " Image Selected!";
        },
        reset: function () {
            this.image = null;
            this.preview = null;
            this.imageUrl = '';
            this.imagePreviewURL = '';
            this.message = "Please select an Image!";

        },
        resetPreview() {
            this.image = null;
            this.preview = null;
            this.imageUrl = '';
            this.imagePreviewURL = '';
            this.message = "Please select an Image!";

            this.previewImage = null
        },
        onUpload() {
            if (!this.image) {
                this.message = "Please select an Image!";


            } else {
                this.progress = 0;
                let formData = new FormData();
                formData.append('file', this.image);
                axios.post(
                    "http://localhost:3000/api/image-upload"
                    , formData
                    , { headers: { "Content-Type": "multipart/form-data" } }
                )
                    .then(response => {
                        //...
                        this.message = response.data.message;
                        console.log(response);
                    })
                    .catch(e => {
                        this.progress = 0;
                        this.message = "Could not upload the image! " + err;
                        this.currentImage = undefined;
                        //...
                    })

            }

        },
        /////////////////////////////
        reset() {
      this.$refs.form.reset();
    },
        //////////////////////////////////////
        submitForm() {
            let job = JSON.parse(JSON.stringify(this.jobs));
            let formData = new FormData();
            formData.append("Firstname", this.firstName);
            formData.append("Lastname", this.lastName);
            formData.append("email", this.email);
            formData.append("phoneNumber", this.phoneNumber);

            formData.append("address", this.address);
            formData.append("city", this.city);
            formData.append("zipcode", this.zipcode);
            formData.append("level", this.jobs.level);
            formData.append("companyjob", this.jobs.company);
            (this.jobs.dateRange != null) ? formData.append("startdate", this.jobs.dateRange[0]) : '';
            (this.jobs.dateRange != null) ? formData.append("endDate", this.jobs.dateRange[1]) : '';
            formData.append("createdByu", this.userdata._id);
            formData.append("companyBy", this.jobs.companyName);
            formData.append("file", this.image);
            // console.log(Object.fromEntries(formData));
            // console.log(job);

            axios.post('http://localhost:3000/api/employer/employerImage',
                formData,

            )
                .then((res) => {
                    this.$router.push('/employerAdd');
                    this.imageUrl = '';
                    this.imagePreviewURL = '';
                    this.$refs.form.reset();
                    console.log(res);
                    
                    console.log('Success!')
                    console.log({ response })
                    this.responseSuccess = true;
                    

                })
                .catch((error) => {
                    console.log(error);
                });
        },
        ////////////////////////////////

        validate() {
            if (this.$refs.form.validate()) {
                console.log("submit");
                this.formLoading = true;
                // Timeout Function only for showing loading progress
                setTimeout(() => {
                    alert(this.image);
                    this.formLoading = false;
                    this.reset();
                }, 4000);
            }
        },
        validateDate(dateRange) {
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
    },
    created() {
        this.fetchOptions();
    },
    mounted() {
        axios.get(`http://localhost:3000/api/company/companyUserr/${this.userdata._id}`)
            .then(response => {
                this.companies = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    },
    components: {
        Topbar,
        Sidebar,
        UploadImage,
        UpImage,

    }


}

</script>

<style>
.v-input--switch .v-messages {
    display: none;
}

.v-input--switch .v-input__slot {
    margin-bottom: 0px;
}
</style>