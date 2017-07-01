import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import '../assets/vue-material'
import '../assets/fonts/material-icons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

new Vue({
  el: '#App',
  router,
  store,
  render: f => f(App)
})
