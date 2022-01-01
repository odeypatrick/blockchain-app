const router = require('express').Router()
const { placeOrder, getOrders } = require('../../controllers/order')
const { isAuthenticated } = require('../../controllers/AuthController')

// Place Order
router.post('/order/place', isAuthenticated, placeOrder);
router.get('/orders/:userId', isAuthenticated, getOrders),


module.exports = router;