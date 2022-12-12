<template>
    <v-footer dark padless>
      <v-card
        flat
        tile
        class="black white--text py-5 px-5 text-center"
        width="100%"
      >
        <v-row>
          <v-col cols="12" sm="4">
            <v-card-text class="white--text pt-2">
              <v-btn icon>
                <v-icon color="#75E6DA">fa-solid fa-people-line</v-icon>
              </v-btn>
            </v-card-text>
          </v-col>

         
          <v-col cols="12" sm="4">
            <v-card-text class="white--text pt-2">
              <v-btn icon>
                <v-icon color="#75E6DA">fa-solid fa-people-line</v-icon>
              </v-btn>
            </v-card-text>
          </v-col>

          
  
          
          

          <v-col cols="12" sm="4">
            <v-card-text class="pt-2">
              <v-btn class="mx-1 white--text" icon>
                <v-icon color="#A7121D">mdi-heart</v-icon>
              </v-btn>
              Created by Browny & Saif
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>

      <v-row
      justify="center"
      no-gutters
    >
     
      <v-col
        class="teal accent-4 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Browny & Saif</strong>
      </v-col>
    </v-row>
    </v-footer>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style>
  </style>