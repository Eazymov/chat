const path = require('path')
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const ChatController = require('../controllers/chatController')
const catchErrors = require('../handlers/errorHandler')

// router.all('/chat', UserController.checkAuth)

router.get('/', (req, res) => res.redirect('/chat/'))

router.get('/login', UserController.loginPage)
router.post('/login', UserController.login)

router.get('/signup', UserController.loginPage)
router.post('/signup', catchErrors(UserController.signUp))

router.get('/logout', UserController.logout)

router.get('/chat/', ChatController.chatPage)
router.post('/getDialogs', catchErrors(ChatController.getDialogs))
router.post('/getFriends', catchErrors(ChatController.getFriends))
router.post('/getCurrentUser', catchErrors(ChatController.getCurrentUser))
router.post('/message', catchErrors(ChatController.saveMessage))
router.post('/addFriend', catchErrors(ChatController.addFriend))
router.post('/deleteFriend', catchErrors(ChatController.deleteFriend))
router.post('/getPeople', catchErrors(ChatController.getPeople))
router.post('/deleteMessage', catchErrors(ChatController.deleteMessage))
router.post('/getConversation', catchErrors(ChatController.getConversation))

module.exports = router;
