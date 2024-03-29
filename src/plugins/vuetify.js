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
                background: '#111111',
                primary: "#82b19f",
                formBackground: "#23272b"
            },
            light: {
                primary: "#119DA4",
                secondary: "#171b34",
                accent: "#3D87E4",
                error: "#dc6276",
                background: "#F6F5F4",
                formBackground: "#f7f7f7"
            },
        }
    }
});
