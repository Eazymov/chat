import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import AppConversation from '../components/messagesRoute/appMessagesRoute.vue'

export default new Router({
  linkActiveClass: 'active',

  saveScrollPosition: true,

  history: true,

  routes: [
    { path: '/', redirect: '/conversation' },
    { path: '/conversation', component: AppConversation }
  ]
})
