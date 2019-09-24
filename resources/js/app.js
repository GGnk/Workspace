require('jquery')
require('./bootstrap');

import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';

import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)


Vue.component('wrapper', require('./components/WrapperComponent.vue').default);
Vue.component('home', require('./components/modules/HomeComponent.vue').default);
import home from './components/modules/HomeComponent.vue'
import store from '../js/components/store'
const app = new Vue({
    el: '#app',
    store
});


