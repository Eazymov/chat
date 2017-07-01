const path = require('path')
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController.js')
const ChatController = require('../controllers/chatController.js')

// router.all('/chat', UserController.checkAuth)

router.get('/', (req, res) => res.redirect('/chat'))

router.get('/login', UserController.loginPage)
router.post('/login', UserController.login)

router.get('/signup', UserController.loginPage)
router.post('/signup', UserController.signup)

router.get('/logout', UserController.logout)

router.get('/chat', ChatController.chatPage)
router.post('/getFriends', ChatController.getFriends)
router.post('/getCurrentUser', ChatController.getCurrentUser)
router.post('/message', ChatController.saveMessage)
router.post('/getDialog', ChatController.getDialog)

module.exports = router
