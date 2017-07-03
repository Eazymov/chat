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

  res.render('login', { title: '', base: '/chat/' })
}

exports.login = (req, res) => {
  passport.authenticate('basic', (err, user, info) => {
    if (err)
      throw err;

    if (!user)
      throw Error('No user with this username & password');

    req.logIn(user, err => {
      if (err)
        throw err;

      res.send({ success: true })
    })
  })(req, res)
}

exports.signUp = async (req, res) => {
  const { result, comment } = helpers.checkUserData(req.body);
  const { username, email } = req.body;

  if (!result)
    throw Error(comment)

  let user = await User.findOne({ username })

  if (user)
    throw Error('This username is already taken')

  user = await User.findOne({ email })

  if (user)
    throw Error('This email is already taken')

  const newUser = await (new User(req.body)).save()

  req.logIn(newUser, err => {
    if (err)
      throw err;

    res.send({ success: true })
  })
}

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/login')
}
