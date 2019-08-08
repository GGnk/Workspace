require('jquery')
require('./bootstrap');
window.Vue = require('vue');

Vue.component('wrapper', require('./components/WrapperComponent.vue').default);

import store from '../js/components/store'
const app = new Vue({
    el: '#app',
    store
});
