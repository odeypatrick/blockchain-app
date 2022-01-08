const router = require('express').Router()
const { addProducts, removeProducts  } = require('../../controllers/wishlist')
const { isAuthenticated } = require('../../controllers/AuthController')

// Add products
router.post('/wishlist', isAuthenticated, addProducts)

// Remove products
router.delete('/wishlist/:id', isAuthenticated, removeProducts)

module.exports = router;