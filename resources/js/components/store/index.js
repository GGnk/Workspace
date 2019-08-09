import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import state from "./state";


export default new Vuex.Store({
    //Строгий режим. Все изменения проводить через мутацию (в режиме разработчика)
   // strict: process.env.NODE_ENV !== 'production',

    state,
    mutations,
    getters,
    actions
})
