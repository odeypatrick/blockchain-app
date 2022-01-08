const router = require('express').Router()
const { addCard, updateCard, deleteCard, getCard } = require('../../controllers/payment/billing')
const { isAuthenticated } = require('../../controllers/AuthController')

router.post('/card/add', isAuthenticated, addCard)
router.get('/card/:userId', isAuthenticated, getCard)
router.put('/card/:id', isAuthenticated, updateCard)
router.delete('/card/:id', isAuthenticated, deleteCard)

module.exports = router;