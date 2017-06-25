const mongoose = require('mongoose')
const validator = require('validator')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  rights: {
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
  username: {
    unique: true,
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
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
  regdate: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    trim: true
  },
  lastSeen: {
    type: String,
    required: true,
    trim: true
  }
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'username' })

module.exports = mongoose.model('User', userSchema)
