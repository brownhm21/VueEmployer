<template>

    <v-app :style="{ background: $vuetify.theme.themes[theme].background }">

        <Sidebar :drawer="drawer" />
        <Topbar @drawerEvent="drawer = !drawer" />



        <v-main class="py-8 px-6" fluid>
            <v-progress-linear :active="formLoading" indeterminate top absolute
                color="primary accent-4"></v-progress-linear>
            <v-container>
                <v-form ref="form" v-model="valid" lazy-validation
                    :style="{ background: $vuetify.theme.themes[theme].formBackground }"
                    class="elevation-5 rounded-lg px-5 py-7">
                    <v-row>
                        <v-col cols="12">
                            <div class="headline">Employer</div>
                        </v-col>
                        <v-col cols="12" md="6" class="mb-0">
                            <v-text-field label="First Name" v-model="formData.firstName" outlined
                                prepend-inner-icon="mdi-account-arrow-right-outline" :rules="requiredRules" />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field label="Last Name" v-model="formData.lastName" outlined
                                prepend-inner-icon="mdi-account-arrow-left-outline" :rules="requiredRules" />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field label="E-Mail" v-model="formData.email" outlined :rules="emailRules"
                                prepend-inner-icon="mdi-email-outline" />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field label="Phone Number" v-model="formData.phoneNumber" outlined counter="10"
                                :rules="numberRules" prepend-inner-icon="mdi-cellphone" />
                        </v-col>

                        <v-col cols="12">
                            <v-text-field label="Address" v-model="formData.address" outlined :rules="requiredRules"
                                prepend-inner-icon="mdi-home-variant" />
                        </v-col>

                        <v-col cols="6">
                            <v-text-field label="City" v-model="formData.city" outlined :rules="requiredRules"
                                prepend-inner-icon="mdi-map-marker-multiple" />
                        </v-col>

                        <v-col cols="6">
                            <v-text-field label="Zip Code" v-model="formData.zipcode" outlined counter="5"
                                :rules="numberRules" prepend-inner-icon="mdi-map" />
                        </v-col>



                    </v-row>
                    <v-row class="mb-0">
                        <v-col cols="12">
                            <div class="headline">Jobs</div>
                        </v-col>
                    </v-row>
                    <v-btn @click="addRow" small text color="primary" class="ml-2" disabled>
                        <v-icon>mdi-briefcase-plus</v-icon>
                        <span>add</span>
                    </v-btn>
                    <v-row class="rounded mb-2 mx-0" v-for="(job, index) in formData.jobs" :key="index"
                        style="border: 1px solid lightgrey;">
                        <v-col cols="12" md="3">
                            <v-autocomplete v-model="job.position" :items="positions" label="Level"
                                prepend-icon="mdi-domain" :rules="requiredRules" />
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field label="Company Job" v-model="job.company" :rules="requiredRules"
                                hint="The name is quite enough." prepend-icon="mdi-domain" />
                        </v-col>

                        <v-col cols="12" md="4" v-if="job.position === 'Trainee'">
                            <v-dialog ref="dialog" v-model="calenderModal" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="job.dateRange" label="Employment period"
                                        prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                        :rules="requiredRules"></v-text-field>
                                </template>
                                <v-date-picker v-model="job.dateRange" type="month" range>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary"
                                        @click="(calenderModal = false); (job.dateRange = null);">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="validateDate(job.dateRange, index)">
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
                                :disabled="index === Object.keys(formData.jobs).length - 1" @click="moveDown(index)">
                                <v-icon>mdi-menu-down</v-icon>
                            </v-btn>
                            <v-btn icon small color="red" :disabled="Object.keys(formData.jobs).length === 1"
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
                            <v-img :src="imageUrl" class="pa-10 secondary rounded-circle d-inline-block"
                                style="max-height: 30px; max-width: 30px" />

                        </v-col>

                        <v-col cols="12" md="3">
                            <v-file-input v-model="image" type="file" class="input" show-size
                                label="Upload Profile Picture" outlined dense @change="onFileChange" />

                        </v-col>
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






                    </v-row>



                    <v-row>
                        <v-col cols="12">
                            <v-btn color="primary" @click="validate">
                                Submit
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
            <div class="caption mt-10">{{ formData }}</div>

        </v-main>
    </v-app>

</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import UploadImage from "@/components/UploadImage.vue";
import UpImage from "@/components/UpImage.vue";
import axios from 'axios';
export default {
    name: 'employerAdd',


    data: () => ({
        ////////////for image upload
        image: undefined,
        // to save image url
        imageUrl: '',
        imagePreviewURL: null,
        progress: 0,
        message: "",
        currentImage: undefined,
        previewImage: null,
        ///////////////////////////

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
        formData: {
            image:'',
            createdByu:(JSON.parse(localStorage.getItem("user"))._id) ? {"_id":JSON.parse(localStorage.getItem("user"))._id} : null ,
            //companyBy:(JSON.parse(localStorage.getItem("company"))._id) ? {"_id":JSON.parse(localStorage.getItem("company"))._id} : null ,

            jobs: [{}]
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
        ],
        /*createdByu:(JSON.parse(localStorage.getItem("user"))._id) ? {"_id":JSON.parse(localStorage.getItem("user"))._id} : null,
        companyBy:(JSON.parse(localStorage.getItem("company"))._id) ? {"_id":JSON.parse(localStorage.getItem("company"))._id} : null,
        */

    }),
    methods: {
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
            };
            reader.readAsDataURL(file);
        },
        onFileChange(file) {
            if (!file) {
                this.message = "Please select an Image!";
                return;
            }
            this.createImage(file);
            this.message = " Image Selected!";
        },
        reset: function () {
            this.image = null;
            this.preview = null;
            this.imageUrl = '';
            this.message = "Please select an Image!";

        },
        resetPreview() {
            this.image = null;
            this.preview = null;
            this.imageUrl = '';
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
        submitForm(){
    let formData = new FormData();

    formData.append("firstName", this.formFields.picture);
    formData.append("lastName", this.formFields.title);
    formData.append("email", this.formFields.description);
    formData.append("address", this.formFields.picture);
    formData.append("city", this.formFields.title);
    formData.append("zipcode", this.formFields.description);
    formData.append("image", this.image);
    formData.append("city", this.formFields.title);
    formData.append("zipcode", this.formFields.description);


    axios.post('/posts',
     formData, 
    { headers: { "Content-Type": "multipart/form-data" } }
    )
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
    });
},
        ////////////////////////////////
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
                setTimeout(() => {
                    alert(JSON.stringify(this.formData));
                    this.formLoading = false;
                    this.reset();
                }, 4000);
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