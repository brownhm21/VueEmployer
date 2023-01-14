<template>
    
   <v-container>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          show-size
          label="Select Image"
          type="file"
          @change="selectImage"
        ></v-file-input>
      </v-col>

      <v-col cols="4" class="pl-2">
        <v-btn color="success" dark small @click="upload">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <div v-if="progress">
      <div>
        <v-progress-linear
          v-model="progress"
          color="light-blue"
          height="25"
          reactive
        >
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
import UploadService from "../services/UploadFilesService";
import axios from 'axios';

export default {
  name: "upload-image",
  data() {
    return {
      currentImage: undefined,
      previewImage: undefined,

      progress: 0,
      message: "",

      imageInfos: "",
    };
  },
  methods: {
    selectImage(file) {
      this.currentImage = file;
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.progress = 0;
      this.message = "";
     
    },
    upload() {
      if (!this.currentImage) {
        this.message = "Please select an Image!";
        return;
      }

      this.progress = 0;

      const formData = new FormData();
      formData.append("file", this.currentImage);

      axios.post("http://localhost:3000/api/image-upload",this.formData, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          console.log(response);
          
        })
        .catch((err) => {
          this.progress = 0;
          this.message = "Could not upload the image! " + err;
          this.currentImage = undefined;
        });
    },
  
  },
  
};
</script>