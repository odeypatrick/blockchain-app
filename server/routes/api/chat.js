const router = require("express").Router();
const { newConversation, getUserConvo, getUsersConvo } = require('../../controllers/chat/conversation')
const { addMessage, getMessages, deleteMessage } = require('../../controllers/chat/message')
const { isAuthenticated } = require('../../controllers/AuthController')

// New Conversation
router.post('/chat', isAuthenticated, newConversation)

// Get user conversation
router.get('/chat/:userId', isAuthenticated, getUserConvo)

// Get users conversation
router.get('/chat/:firstUserId/:secondUserId', isAuthenticated, getUsersConvo)

// Add Message
router.post('/messages', isAuthenticated, addMessage)

// Get messages
router.get('/messages/:conversationId', getMessages)

// Delete message
router.delete('/messages/:conversationId', deleteMessage)

module.exports = router;