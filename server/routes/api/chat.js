const router = require("express").Router();
const { newConversation, getUserConvo, getUsersConvo } = require('../../controllers/chat/conversation')
const { addMessage, getMessages } = require('../../controllers/chat/message')
const { isAuthenticated } = require('../../controllers/AuthController')

// New Conversation
router.post('/chat', isAuthenticated, newConversation)

// Get user conversation
router.get('/chat/:userId', isAuthenticated, getUserConvo)

// Get users conversation
router.get('/find/:firstUserId/:secondUserId', isAuthenticated, getUsersConvo)

// Add Message
router.post('/chat/messages/', isAuthenticated, addMessage)

// Get messages
router.get('/chat/messages/:conversationId', getMessages)

module.exports = router;