require('jquery');
require('./bootstrap');

import Vue from 'vue'
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

import "vuetify/dist/vuetify.min.css";
import '@mdi/font/css/materialdesignicons.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.use(Vuetify);
Vue.use(VueRouter);

import routes from './components/store/routes'
const vuetify = new Vuetify({});

const router = new VueRouter({
    routes
})
import wrapper from './components/WrapperComponent';
import home from './components/HomeComponent';
import store from '../js/components/store';
import FileManager from "./components/modules/FileManager/laravel-file-manager";

Vue.use(FileManager, {store})

const app = new Vue({
    el: '#app',
    components: {
        // wrapper,
        home
    },
    vuetify,
    store,
    router

});

