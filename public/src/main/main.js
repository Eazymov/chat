import Vue from 'vue';
import App from './App.vue';
import Axios from './mixins/axios'
import Async from 'vue-async-computed';

import router from './router';
import store from './store';

import '../assets/vue-material';
import '../assets/fonts/material-icons.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

Vue.use(Async);

Vue.mixin(Axios);

new Vue({
  el: '#App',
  router,
  store,
  render: f => f(App)
})
