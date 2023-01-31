<template>
    <v-container>

        <v-row>
            <v-col>
                <v-img :src="imageUrl" class="pa-10 secondary rounded-circle d-inline-block"
                    style="max-height: 30px; max-width: 30px" />
                <v-btn fab dark small color="primary" @click="reset">
                    <v-icon dark> mdi-close-outline</v-icon>
                </v-btn>



            </v-col>


            <v-col cols="12" md="4">
                <v-file-input v-model="image" type="file" class="input" show-size label="Upload Profile Picture"
                    outlined dense @change="onFileChange" />
            </v-col>
            <v-col cols="12" md="4">
                <v-btn color="success" dark small @click="onUpload">
                    Upload
                    <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>
            </v-col>

        </v-row>

        <v-row>



        </v-row>

        <div v-if="progress">
            <div>
                <v-progress-linear v-model="progress" color="light-blue" height="25" reactive>
                    <strong>{{ progress }} %</strong>
                </v-progress-linear>
            </div>
        </div>



        <v-alert v-if="message" border="left" color="blue-grey" dark>
            {{ message }}
        </v-alert>




    </v-container>
</template>
<script>
import axios from 'axios';

export default {

    data() {
        return {
            image: undefined,
            // to save image url
            imageUrl: '',
            progress: 0,
            message: "",
            currentImage: undefined,
        };
    },
    methods: {
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
        },
        reset: function () {
            this.image = null;
            this.preview = null;
            this.imageUrl = null;
            this.message = "Please select an Image!";

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
            
        }
    }


}
</script>