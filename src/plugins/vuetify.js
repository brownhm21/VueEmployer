import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VuetifyToast from 'vuetify-toast-snackbar';

Vue.use(Vuetify);
/*Vue.use(VuetifyToast);*/

export default new Vuetify({
    icons: {
        iconfont: 'fa' || 'md' || 'mdi'
    },
    theme: {
        themes: {
            dark: {
                background: '#111111'
            }
        }
    }
});
