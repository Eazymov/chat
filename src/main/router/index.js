import Vue from 'vue'
import Router from 'vuex'

Vue.use(Router)

import Homepage from '../components/homepage.vue'

export default new Router({
  linkActiveClass: 'active',

  saveScrollPosition: true,

  history: true,

  routes: [
    { path: '/', component: Homepage }
  ]
})
