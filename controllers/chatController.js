const path = require('path')
const mongoose = require('mongoose')
const Message = mongoose.model('Message')
const User = mongoose.model('User')
const { createConnection, sendMessage } = require('../handlers/webSocket')

const users = {};

createConnection(users);

exports.chatPage = (req, res) => {
  res.render('index', { title: 'Chat', base: '/chat/' })
}

exports.getDialogs = async (req, res) => {
  const dialogs = await User.find()

  res.json({ dialogs })
}

exports.getFriends = async (req, res) => {
  const { friendList, limit } = req.body;

  const friends = await User.find({ '_id': { $in: friendList } }).limit(limit);

  res.json(friends);
}

exports.getCurrentUser = async (req, res) => {
  // const user = req.user;
  // res.send({ user })
  const user = await User.findById('594fdaa22c6bb513a08b4648')

  res.json({ user })
}

exports.saveMessage = async ({ body }, res) => {
  const { sender_id, recipient_id } = body;
  const message = await (new Message(body)).save()
  const response = JSON.stringify({ message })

  sendMessage(users, response, [sender_id, recipient_id])

  res.json({ success: true })
}

exports.deleteMessage = async ({ body }, res) => {
  await Message.findById(body.id).remove();
  res.end();
}

exports.getConversation = async (req, res) => {
  const { sender_id, recipient_id } = req.body;
  const users = {};

  const messages = await Message
    .find({ $or: [
      { sender_id, recipient_id },
      { recipient_id, sender_id }
    ] })
    .select('date sender_id recipient_id content')
    .sort('-timestamp')
    .limit(10)

  users[sender_id] = await User
    .findById(sender_id)
    .select('-_id avatar firstname lastname')

  users[recipient_id] = await User
    .findById(recipient_id)
    .select('-_id avatar firstname lastname')

  res.json({ messages, users });
}

exports.addFriend = async (req, res) => {
  // const userID = req.user._id;
  const userID = '594fdaa22c6bb513a08b4648';
  const friendID = req.body.id;

  await User.findByIdAndUpdate(userID, { $addToSet: { friends: friendID } })

  res.json(friendID);
}

exports.deleteFriend = async (req, res) => {
  // const userID = req.user._id;
  const userID = '594fdaa22c6bb513a08b4648';
  const friendID = req.body.id;

  await User.findByIdAndUpdate(userID, { $pull: { friends: friendID } })

  res.json(friendID);
}

exports.getPeople = async (req, res) => {
  const limit = req.body.limit;
  const people = await User.find().limit(limit);

  res.json(people);
}
