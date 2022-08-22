import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import VuetifyUpload from "@kingscode/vuetify-upload";
import store from "./store";

Vue.use(VuetifyUpload);
Vue.config.productionTip = false

store.subscribe( (mutation, state) => {
    localStorage.setItem('user', JSON.stringify(state.user));
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
