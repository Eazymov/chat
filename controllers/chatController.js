const url = require('url')
const path = require('path')
const mongoose = require('mongoose')
const Message = mongoose.model('Message')
const User = mongoose.model('User')

const ws = new require('ws')
const wss = new ws.Server({ port: 8081 })
const users = {}

wss.on('connection', (ws, req) => {
  const URL = url.parse(req.url)
  const id = URL.query;

  users[id] = ws;

  console.log(`New ws connection ${id}`)

  ws.on('close', () => {
    console.log(`Connection ${id} closed`);

    delete users[id];
  })
})

exports.chatPage = (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'))
}

exports.getFriends = async (req, res) => {
  const friends = await User.find()

  res.send({ friends })
}

exports.getCurrentUser = async (req, res) => {
  // const user = req.user;
  // res.send({ user })
  const user = await User.findById('594fdaa22c6bb513a08b4648')

  res.send({ user })
}

exports.saveMessage = (req, res) => {
  const { sender_id, recipient_id, content } = req.body;
  const newMessage = new Message({
    sender_id,
    recipient_id,
    content
  })

  newMessage.save((err, message) => {
    if (err)
      return res.send({ err })

    const response = JSON.stringify({ message })

    sendMessage(users, response, [sender_id, recipient_id])

    res.send({ success: true })
  })
}

const sendMessage = async (users, response, ids) => {
  ids = [...new Set(ids)];

  ids.forEach(id => {
    const user = users[id];

    if (user)
      user.send(response)
  })
}

exports.getDialog = async (req, res) => {
  const { sender_id, recipient_id } = req.body;
  const users = {};

  const messages = await Message
    .find({ $or: [
      { sender_id, recipient_id },
      { recipient_id, sender_id }
    ] })
    .sort('-timestamp')
    .limit(10)

  users[sender_id] = await User.findById(sender_id)
  users[recipient_id] = await User.findById(recipient_id)

  res.send({ messages, users });
}
