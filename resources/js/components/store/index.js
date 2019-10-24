import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import state from "./state"

import fileManager from "./modules/file-manager"
import maps from "./modules/maps";
import tasks from "./modules/tasks";
import search from "./modules/search";


export default new Vuex.Store({
    //Строгий режим. Все изменения проводить через мутацию (в режиме разработчика)
   // strict: process.env.NODE_ENV !== 'production',
    modules: {
        fileManager,
        maps,
        tasks,
        search
    },
    state,
    mutations,
    getters,
    actions
})
