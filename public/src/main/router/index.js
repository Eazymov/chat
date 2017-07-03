import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import ProfileRoute from '../components/profileRoute/appProfileRoute.vue';
import MessagesRoute from '../components/messagesRoute/appMessagesRoute.vue';
import FriendsRoute from '../components/friendsRoute/appFriendsRoute.vue';
import PeopleRoute from '../components/peopleRoute/appPeopleRoute.vue';
import SettingsRoute from '../components/settingsRoute/appSettingsRoute.vue';

export default new Router({
  linkActiveClass: 'active',

  saveScrollPosition: true,

  history: true,

  routes: [
    { path: '/', redirect: '/profile' },
    { path: '/profile', component: ProfileRoute },
    { path: '/messages', component: MessagesRoute },
    { path: '/friends', component: FriendsRoute },
    { path: '/people', component: PeopleRoute },
    { path: '/settings', component: SettingsRoute }
  ]
})
