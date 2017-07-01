const path = require('path')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')
const helpers = require('../handlers/helpers.js')

exports.checkAuth = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect('/login')
}

exports.loginPage = (req, res) => {
  if (req.isAuthenticated()) res.redirect('/chat');

  res.sendFile(path.resolve(__dirname, '../views/login.html'))
}

exports.login = (req, res) => {
  passport.authenticate('basic', (err, user, info) => {
    if (err)
      return res.send({ err })

    if (!user) {
      const err = { message: 'No user with this username & password' }

      return res.send({ err })
    }

    req.logIn(user, err => {
      if (err)
        return res.send({ err })

      res.send({ success: true })
    })
  })(req, res)
}

exports.signup = async (req, res) => {
  const { firstname, lastname, username, email, password, gender } = req.body;
  let user = null;

  user = await User.findOne({ username })

  if (user) {
    const err = { message: 'This username is already taken' }
    return res.send({ err })
  }

  user = await User.findOne({ email })

  if (user) {
    const err = { message: 'This email is already taken' }
    return res.send({ err });
  }

  const newUser = new User({
    firstname,
    lastname,
    username,
    email,
    password,
    gender
  })

  const test = helpers.checkUserData(newUser);

  if (!test.result) {
    const err = { message: test.comment }
    return res.send({ err })
  }

  newUser.save((err, user) => {
    if (err)
      return res.send({ err })

    req.logIn(user, err => {
      if (err)
        return res.send({ err })

      res.send({ success: true })
    })
  })
}

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/login')
}
