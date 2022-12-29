<template>
  <v-app :style="{ background: $vuetify.theme.themes.dark.background }">

    <Navbar />
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto rounded-xl" flat>
            <v-img :src="require('../assets/4pic.jpg')" contain max-height="100%">
              <v-card-title class="top ml-10">
                <h2 class="title1">Control your</h2>
              </v-card-title>
              <v-card-title class="ml-10 mt-n8">
                <h2 class="title2">Daily Ressources</h2>
              </v-card-title>
             <!----
              <v-card-text class="ml-10">
                <h3 class="green--text">#Free Delivery</h3>
              </v-card-text>
              ---> 
              <v-card-text class="ml-10">
                <v-row>
                  <v-col cols="4">
                    <v-text-field label="Navigate your daily ressources" class="d-none d-sm-none d-md-flex" filled
                      prepend-inner-icon="mdi-magnify" solo flat background-color="" rounded outlined
                      success></v-text-field>
                  </v-col>
                  <v-col cols="2" class="marginLeft">
                    <v-btn color="green" rounded dark x-large class="py-7 d-none d-sm-none d-md-flex">
                      search
                    </v-btn>
                  </v-col>

                </v-row>


              </v-card-text>
              <v-col style="
                position: absolute;
                margin-left: auto;
                margin-right: auto;
                margin-top: 300px;
                left: 0;
                right: 0;
                text-align: center;
                
                
              ">
                <v-btn v-for="icon in icons" :key="icon" text dark>
                  <v-icon>{{ icon }}</v-icon>
                </v-btn>
              </v-col>

            </v-img>
          </v-card>
        </v-col>

        <v-col cols="12" class="padd">
          <div class="first" id="about">
            <h2 class="white--text " style="text-align: center;
            margin-top: 10px;
            margin-bottom: 30px;
            
            ">About</h2>
            <v-row>
              <v-col cols="12">
                <div class="child bgColor1">
                  <v-icon color="#75E6DA" x-large class="ml-3">mdi-palette-swatch</v-icon>
                  <h3 class="white--text ml-3 mt-4">UI Design</h3>
                  <p class="grey--text ml-3 mt-6">
                    Lorem, ipsum dolor sit amet <br />consectetur adipisicing
                    elit.
                  </p>
                  <v-btn color="#75E6DA" dark text>
                    know more
                    <v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
                <div class="child bgColor2">
                  <v-icon color="" x-large class="ml-3" dark>mdi-shopping</v-icon>
                  <h3 class="white--text ml-3 mt-4">Product Design</h3>
                  <p class="grey--text ml-3 mt-6">
                    Lorem, ipsum dolor sit amet <br />consectetur adipisicing
                    elit.
                  </p>
                  <v-btn color="" dark text>
                    know more
                    <v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
                <div class="child bgColor1">
                  <v-icon color="#75E6DA" x-large class="ml-3">mdi-book-open-page-variant</v-icon>
                  <h3 class="white--text ml-3 mt-4">Branding</h3>
                  <p class="grey--text ml-3 mt-6">
                    Lorem, ipsum dolor sit amet <br />consectetur adipisicing
                    elit.
                  </p>
                  <v-btn color="#75E6DA" dark text>
                    know more
                    <v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
              </v-col>

              <!-----------------------------------STATISTICS------------------------------------------------------------------------------->
              <v-col cols="12" style="
                position: absolute;
                margin-left: auto;
                margin-right: auto;
                margin-top: 300px;
                left: 0;
                right: 0;
                text-align: center;
                
                
              ">
                <div class="child1">
                  <h1 class="red--text text--darken-4 mt-4 number">12</h1>
                  <h3 class="white--text mt-4">Years Experience</h3>
                </div>
                <div class="child2 mRight">
                  <v-row>
                    <v-col cols="12" class="childcol">
                      <div class="child2 mButton padding bgColor1">
                        <h1 class="red--text text--darken-4">60+</h1>
                        <p class="grey--text">Clients</p>
                      </div>
                    </v-col>
                    <v-col cols="12" class="childcol">
                      <div class="child2 padding bgColor1">
                        <h1 class="red--text text--darken-4">122+</h1>
                        <p class="grey--text">Completed Projects</p>
                      </div>
                    </v-col>
                  </v-row>
                </div>
                <div class="child2">
                  <v-row>
                    <v-col cols="12" class="childcol">
                      <div class="child2 mButton padding bgColor1">
                        <h1 class="green--text text--darken-4">08</h1>
                        <p class="grey--text">Years Experience</p>
                      </div>
                    </v-col>
                    <v-col cols="12" class="childcol">
                      <div class="child2 padding bgColor1">
                        <h1 class="red--text text--darken-4">10</h1>
                        <p class="grey--text">Achievements</p>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-col>


            </v-row>
          </div>
        </v-col>

        <!------------------------------------------------------------------------------------------------------------------------->


        <v-col cols="15" class="padd topInverse" id="contact">
          <div style="position:relative;
          margin-left: 400px;
          margin-top: 20%;">
            <div class="try" id="about">
              <v-row>
                <v-col cols="6">
                  <h4 class="white--text">FEATURED PROJECTS</h4>
                <p class="grey--text">Lorem ipsum dolor Lorem ipsum dolor</p>
                </v-col>
                <v-col cols="5">
                  <v-btn tile color="#75E6DA" dark> View All </v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
         
        </v-col>

        <!--------------------------CARD Test----------------------------------------------->
          <v-row class="cards-list" id="services">
            <h2 class="white--text "
            style=" position: absolute;
                margin-left: auto;
                margin-right: auto;
                left: 0;
                right: 0;
                text-align: center;
                " >Services</h2>
  
<div class="card 1">
  <div class="card_image"> <img src="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /> </div>
  <div class="card_title title-white">
    <p>Progress</p>
  </div>
</div>

  <div class="card 2">
  <div class="card_image">
    <img src="https://images.pexels.com/photos/52608/pexels-photo-52608.jpeg" />
    </div>
  <div class="card_title title-white">
    <p>Developpement</p>
  </div>
</div>

<div class="card 3">
  <div class="card_image">
    <img src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
  </div>
  <div class="card_title title-white">
    <p>Spirit</p>
  </div>
</div>
  
  <div class="card 4">
  <div class="card_image">
    <img src="https://images.pexels.com/photos/1216544/pexels-photo-1216544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
    </div>
  <div class="card_title title-white">
    <p>Confidence</p>
  </div>
  </div>

</v-row>
          
          
          
          
         <!------------------------------------------------------------>



        <!-----
          <v-col md="3" offset-md="3">
          <v-card
            class="pa-2 py-12"
            outlined
            tile
            height="250px"
            color="#75E6DA"
          >
            <v-img src="3.png" contain max-height=""></v-img>
          </v-card>
        </v-col>

        <v-col md="3">
          <v-card
            class="pa-2 py-12"
            outlined
            tile
            height="250px"
            color="#75E6DA"
          >
            <v-img src="2.png" contain max-height=""></v-img>
          </v-card>
        </v-col>

        <v-col md="3" offset-md="3">
          <v-btn color="white" dark text class="ml-n4"> The Vintage </v-btn
          ><br />

          <v-btn color="#75E6DA" dark text class="ml-n4">
            know more
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
        <v-col md="3">
          <v-btn color="white" dark text class="ml-n4"> Foodasa </v-btn><br />

          <v-btn color="#75E6DA" dark text class="ml-n4">
            know more
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>

        <v-col md="3" offset-md="3">
          <v-card
            class="pa-2 py-12"
            outlined
            tile
            height="250px"
            color="#75E6DA"
          >
            <v-img src="4.png" contain max-height=""></v-img>
          </v-card>
        </v-col>



        <v-col md="3">
          <v-card
            class="pa-2 py-12"
            outlined
            tile
            height="250px"
            color="#75E6DA"
          >
            <v-img src="1pic.jpg" contain max-height=""></v-img>
          </v-card>
        </v-col>
        <v-col md="3" offset-md="3">
          <v-btn color="white" dark text class="ml-n4"> AAE IdeaPro </v-btn
          ><br />

          <v-btn color="#75E6DA" dark text class="ml-n4">
            know more
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
        <v-col md="3">
          <v-btn color="white" dark text class="ml-n4"> Mozaik </v-btn><br />
          <v-btn color="#75E6DA" dark text class="ml-n4">
            know more
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>

        ------->








        <v-col cols="12" class="padd topInverse">
          <div class="second">
            <div class="secondchild1" id="contact">
              <v-row>
                <v-col cols="7">
                  <h1 class="white--text">
                    Let's work together on<br />your next project
                  </h1>
                  <p class="grey--text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius nesciunt ducimus natus <br />
                  </p>
                </v-col>
                <v-col cols="5">
                  <v-btn tile color="#75E6DA" dark class="mt-16">
                    Contact
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
          <v-toolbar class="topTolbar" color="#111111" dark flat>
            <div style="
                position: absolute;
                margin-left: auto;
                margin-right: auto;
                left: 0;
                right: 0;
                text-align: center;
              ">
              <v-btn text>Home</v-btn>
              <v-btn text>Project</v-btn>
              <v-btn text>about</v-btn>
              <v-btn text> contact</v-btn>
            </div>
          </v-toolbar>
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
  name: 'Home',
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),

  components: {
    Navbar,
    Footer,
  },
}
</script>
<style scoped>
.top {
  margin-top: 180px;
}

.topInverse {
  margin-top: -250px;
}

.topTolbar {
  margin-top: 100px;
  text-align: center;
}

.first {
  width: 100%;
  height: 610px;
  background: linear-gradient(to right,
      #181818,
      #181818 50%,
      #111111 50%,
      #111111 50%);
  text-align: center;
  padding: 2rem 2rem;
}

.second {
  width: 100%;
  height: 400px;
  background: #181818;
  text-align: center;
  padding: 2rem 2rem;
}

.secondchild1 {
  display: inline-block;
  background-color: #1e1e1e;
  padding: 2rem 1rem;
  vertical-align: middle;
  text-align: left;
  margin-top: 250px;
}
.try{
  display: flex;
  margin-top: 250px;
}

.child {
  display: inline-block;
  padding: 2rem 1rem;
  vertical-align: middle;
  text-align: left;
  margin-right: 8px;
}

.bgColor1 {
  background-color: #1e1e1e;
}

.bgColor2 {
  background-color: #0d8581;
}

.child1 {
  display: inline-block;
  padding: 2rem 1rem;
  vertical-align: middle;
  margin-right: 5px;
  width: 240px;
}

.child2 {
  display: inline-block;
  width: 245px;
  vertical-align: middle;
}

.mRight {
  margin-right: 8px;
}

.mButton {
  margin-bottom: 8px;
}

.padding {
  padding: 8px 0;
}

.col-12.padd {
  padding: 12px 0 !important;
}

.col-12.childcol {
  padding: 0 !important;
}

h1.number {
  font-size: 50px;
  font-weight: bold;
}

.cards-list {
  z-index: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 5%;
}

.card {
  margin: 50px auto;
  width: 300px;
  height: 300px;
  border-radius: 40px;
box-shadow: 5px 5px 30px 7px rgba(0,0,0,0.25), -5px -5px 30px 7px rgba(0,0,0,0.22);
  cursor: pointer;
  transition: 0.4s;
}

.card .card_image {
  width: inherit;
  height: inherit;
  border-radius: 40px;
}

.card .card_image img {
  width: inherit;
  height: inherit;
  border-radius: 40px;
  object-fit: cover;
}

.card .card_title {
  text-align: center;
  border-radius: 0px 0px 40px 40px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 30px;
  margin-top: -80px;
  height: 40px;
}

.card:hover {
  transform: scale(0.9, 0.9);
  box-shadow: 5px 5px 30px 15px rgba(0,0,0,0.25), 
    -5px -5px 30px 15px rgba(0,0,0,0.22);
}

.title-white {
  color: white;
}

.title-black {
  color: black;
}

@media all and (max-width: 500px) {
  .card-list {
    /* On small screens, we are no longer using row direction but column */
    flex-direction: column;
  }
}


/*
.card {
  margin: 30px auto;
  width: 300px;
  height: 300px;
  border-radius: 40px;
  background-image: url('https://i.redd.it/b3esnz5ra34y.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-repeat: no-repeat;
box-shadow: 5px 5px 30px 7px rgba(0,0,0,0.25), -5px -5px 30px 7px rgba(0,0,0,0.22);
  transition: 0.4s;
}
*/
</style>
