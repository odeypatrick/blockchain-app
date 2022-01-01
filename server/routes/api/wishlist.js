const router = require('express').Router()
const { addProducts, removeProducts  } = require('../../controllers/wishlist')

// Add products
router.post('/wishlist/add', addProducts)

// Remove products
router.delete('/wishlist/:id/remove', removeProducts)

module.exports = router;