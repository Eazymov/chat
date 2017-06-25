const path = require('path')
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController.js')

router.all('/chat', UserController.checkAuth)

router.get('/', (req, res) => {
  res.redirect('/chat')
})

router.get('/chat', (req, res) => {
  res.send('qwe')
})

router.get('/login', UserController.loginPage)
router.post('/login', UserController.login)

router.get('/signup', UserController.loginPage)
router.post('/signup', UserController.signup)

router.get('/logout', UserController.logout)

module.exports = router
