import Axios from 'axios'
import { handleError } from '../../handlers'

export default {
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

  getDialogs ({ commit, state }) {
    Axios
      .post('/getDialogs')
      .then(response => {
        const { err, dialogs } = response.data;

        if (err)
          throw err;

        commit('setDialogs', dialogs)
      })
      .catch(handleError)
  },

  addFriend ({ commit, state }, id) {
    Axios
      .post('/addFriend', { id })
      .then(({ data }) => commit('addFriend', data))
      .catch(handleError);
  },

  deleteFriend ({ commit, state }, id) {
    Axios
      .post('/deleteFriend', { id })
      .then(({ data }) => commit('deleteFriend', data))
      .catch(handleError);
  }
}
