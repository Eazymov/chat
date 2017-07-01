const mongoose = require('mongoose')
const helpers = require('../handlers/helpers.js')

const messageSchema = new mongoose.Schema({
  sender_id: {
    type: String,
    required: true,
    trim: true
  },
  recipient_id: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  date: {
    type: String,
    default: helpers.getFullDate(),
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model('Message', messageSchema)
