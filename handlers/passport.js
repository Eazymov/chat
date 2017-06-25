const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const LocalStrategy = require('passport-local').Strategy
const VKStrategy = require('passport-vkontakte').Strategy

passport.use('basic', new LocalStrategy((username, password, done) => {
  User.findOne({ username, password }, (err, user) => {
    if (err)
      return done(err)

    if (!user)
      return done(null, false, {
        message: 'There is no user with this username and password'
      })

    return done(null, user)
  })
}))

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
