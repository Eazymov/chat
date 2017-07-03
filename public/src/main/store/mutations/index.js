const address = 'ws://217.144.177.131:8081';

export default {
  setCurrentUser (state, data) {
    state.currentUser = data;
  },

  setCurrentDialog (state, id) {
    state.currentDialogID = id;
  },

  setDialogs (state, dialogs) {
    state.dialogs = dialogs;
  },

  createSocket (state, userID) {
    state.Socket = new WebSocket(`${address}?${userID}`)
  },

  addFriend (state, friendID) {
    state.currentUser.friends.push(friendID);
  },

  deleteFriend (state, friendID) {
    const friends = state.currentUser.friends;
    const index = friends.indexOf(friendID);

    friends.splice(index, 1);
  }
}
