<template>
  <v-app>
    <navigation :color="color" :flat="flat" />
    <LandingContact />
    <TestimonialsList />


    <v-main>
      <SimplifyBlock/>
      


      
      


        <div class="svg-border-waves text-white pt-15">
        <v-img src="~@/assets/img/borderWavesBlue.svg"/>
      </div>
    </v-main>
    <v-scale-transition>
      <v-btn
        fab
        v-show="fab"
        v-scroll="onScroll"
        dark
        fixed
        bottom
        right
        color="secondary"
        @click="toTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-scale-transition>

    <foote />


  </v-app>
</template>
  
<script>
import navigation from "@/components/Navigation.vue";
import SimplifyBlock from '@/components/SimplifyBlock'
import TestimonialsList from '@/components/TestimonialsList'
import foote from "@/components/Footer.vue";
import LandingContact from '@/components/LandingContact.vue'
import LandingHome from '@/components/LandingHome.vue'


export default {
  name: 'App',
  components: {
   
    TestimonialsList,
    SimplifyBlock,
    foote,
    LandingContact,
    LandingHome,
    navigation,

   
  },
  data: () => ({
    fab: null,
    color: "",
    flat: null,
  }),
  created() {
    const top = window.pageYOffset || 0;
    if (top <= 60) {
      this.color = "transparent";
      this.flat = true;
    }
  },
  watch: {
    fab(value) {
      if (value) {
        this.color = "secondary";
        this.flat = false;
      } else {
        this.color = "transparent";
        this.flat = true;
      }
    },
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 60;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
}
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam:wght@400;500;700;800&display=swap');
:root {
  /* COLORS */
  --primary-red: hsl(224, 95%, 29%);
  --primary-blue: hsl(228, 39%, 23%);

  --neutral-gray-blue: hsl(227, 12%, 61%);
  --neutral-dark-blue: hsl(233, 12%, 13%);
  --neutral-pale-red: hsl(13, 100%, 96%);
  --neutral-btn-shadow: hsla(12, 88%, 70%, 75%);
  --neutral-light-gray: hsl(0, 0%, 98%);

  /* TYPOGRAPHY */
  --ff-defaul: 'Be Vietnam', sans-serif;
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-bold: 700;
  --fw-extra-bold: 800;
  --fs-body-copy: 16px;

  /* DEVICE SIZES */
  --ss-mobile: 375px;
  --ss-desktop: 1440px;
}



.v-main {
    background-image: url("~@/assets/img/bgMain.png");
    background-color:none;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
}
.v-main .background {
    background-color:none;
   
}

.btn {
  cursor: pointer;
  background-color: var(--primary-red);
  color: var(--neutral-light-gray);
  box-shadow: 0 3px 7px var(--neutral-btn-shadow);
  border-radius: 50px;
  text-align: center;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem;
  font-size: .875rem;
  font-weight: var(--fw-medium);
}

.btn:hover {
  transform: translateY(-.5rem);
  transition: transform .2s ease-in-out;
  opacity: .8;
}



/* .hero {
  background: url(./assets/bg-tablet-pattern.svg) no-repeat top -7rem left 5rem;
  background-size: 120%;
} */

/* .second-bg {
  background: url(./assets/bg-tablet-pattern.svg) no-repeat top 28rem left 15rem;
  background-size: 100%;
} */


</style>