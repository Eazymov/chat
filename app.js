const path = require('path')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const routes = require('./routes')

require('./handlers/passport.js')

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use('/dist', express.static(__dirname + '/dist'))
app.use('/public', express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'SECRET', resave: true, saveUninitialized: true}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes)

const webpackConfig = require('./webpack.config.js')
const compiler = require('webpack')(webpackConfig)
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))
app.use(hotMiddleware(compiler))

module.exports = app
