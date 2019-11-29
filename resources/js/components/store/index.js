import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

import config from './config'

import maps from "./modules/maps"
import tasks from "./modules/tasks"
import search from "./modules/search"
import dialog from "./modules/dialog"
import contacts from "./modules/contacts"
import posts from "./modules/posts"
import FileManager from '../pages/laravel-file-manager'
import pin_code from "../modules/PinCodeComponent";

export default new Vuex.Store({
    // Строгий режим. Все изменения проводить через мутацию (в режиме разработчика)
    // strict: process.env.NODE_ENV !== 'production',
    modules: {
        config,
        contacts,
        posts,
        pin_code,
        // maps,
        tasks,
        search,
        // dialog
    }

})


