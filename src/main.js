import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import VuetifyUpload from "@kingscode/vuetify-upload";
import store from "./store";
import {auth} from "./firebase";
import {setLoggedInUser} from './services/user-service'

auth.onAuthStateChanged(user => {
    setLoggedInUser(user)
});

Vue.use(VuetifyUpload);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
