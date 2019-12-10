import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

import config from './config'

// import maps from "../modules/Map/maps"
// import dialog from "../modules/Messages/dialog"
// import FileManager from '../modules/FileManager/laravel-file-manager'
import tasks from "../modules/Tasks"
import search from "../modules/Search"
import contacts from "../modules/Contacts"
import posts from "../modules/Posts"
import pin_code from "../modules/PinCode";
import news from "../modules/News";

export default new Vuex.Store({
    // Строгий режим. Все изменения проводить через мутацию (в режиме разработчика)
    // strict: process.env.NODE_ENV !== 'production',
    modules: {
        config,
        contacts,
        posts,
        pin_code,
        // maps,
        news,
        tasks,
        search,
        // dialog
    }

})


