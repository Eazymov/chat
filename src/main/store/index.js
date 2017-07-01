import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { handleError } from '../handlers'

Vue.use(Vuex)

const address = 'ws://217.144.177.131:8081';

export default new Vuex.Store({
  state: {
    Socket: null,
    dialogs: [],
    currentUser: {},
    currentDialogID: null
  },

  mutations: {
    setCurrentUser (state, data) {
      state.currentUser = data;
    },

    setCurrentDialog (state, id) {
      state.currentDialogID = id;
    },

    setFriends (state, data) {
      state.dialogs = data;
    },

    createSocket (state, userID) {
      state.Socket = new WebSocket(`${address}?${userID}`)
    }
  },

  actions: {
    getCurrentUser ({ commit, state }) {
      Axios
        .post('/getCurrentUser')
        .then(response => {
          const { err, user } = response.data;

          if (err)
            throw err;

          commit('createSocket', user._id)
          commit('setCurrentUser', user)
        })
        .catch(handleError)
    },

    getFriends ({ commit, state }) {
      Axios
        .post('/getFriends')
        .then(response => {
          const { err, friends } = response.data;

          if (err)
            throw err;

          commit('setFriends', friends)
        })
        .catch(handleError)
    }
  }
})
