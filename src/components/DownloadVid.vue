<template>
    
    <video-background 
    :src="require('../assets/img/video.mp4')"
    style="max-height: 500px; height: 200vh;"
    overlay="linear-gradient(45deg,#2a4ae430,#fb949e6b)"
 >
 <div class="logo-container">
      <div>
        <img alt="PutNet logo" src="../assets/img/logo1.svg" class="logo" />
        <h1>Employerella Your Ideal Way To Controll Your Ressources</h1>
      </div>
    </div>
    
 </video-background>
 


    <!-- <video-bg :sources="['assets/img/video.mp4']">
    <div class="logo-container">
      <div>
        <img alt="PutNet logo" src="../assets/img/logo1.svg" class="logo" />
        <h1>Employerella Your Ideal Way To Controll Your Ressources</h1>
      </div>
    </div>
  </video-bg> -->
  
  </template>
  
  <script>
  export default {
    name: "Header",
    data() {
        return {
            videoUrl: '@/assets/img/video.mp4',
            videoType: 'video/mp4'
        }
    },
  };
  </script>
  
  <style lang="scss">
  .logo {
    width: 70%;
    vertical-align: middle;
  }
  .logo-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color:aliceblue;
  }
  </style>