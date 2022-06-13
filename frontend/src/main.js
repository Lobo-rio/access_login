import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@/plugins/vuelidate'
import vuetify from '@/plugins/vuetify'

new Vue({
    vuetify,
    store,
    render: (h) => h(App)
}).$mount("#app")