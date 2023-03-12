import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCookie from 'vue-cookie'
import http from './axios'
import VueYouTubeEmbed from 'vue-youtube-embed'
import VideoBg from "vue-videobg";
// import VideoBackground from 'vue-responsive-video-background-player'
import VideoBackground from 'vue-responsive-video-background-player'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

 Vue.component(VideoBackground);

Vue.use(VueYouTubeEmbed)
Vue.component("video-bg", VideoBg);
Vue.component('video-background', VideoBackground);

Vue.config.productionTip = false
Vue.prototype.$http= http
new Vue({
  router,
  store,
  vuetify,
  VueCookie,
  render: h => h(App)
}).$mount('#app')
