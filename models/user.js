const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const helpers = require('../handlers/helpers.js')

const userSchema = new mongoose.Schema({
  rights: {
    type: String,
    default: 'default',
    trim: true
  },
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    unique: true,
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: 'default.png',
    trim: true
  },
  gender: {
    type: String,
    required: true,
    trim: true
  },
  regdate: {
    type: String,
    default: helpers.getFullDate(),
    trim: true
  },
  lastSeen: {
    type: String,
    default: helpers.getFullDate(),
    trim: true
  },
  friends: {
    type: Array,
    default: []
  },
  dialogs: {
    type: Array,
    default: []
  }
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'username' })

module.exports = mongoose.model('User', userSchema)
