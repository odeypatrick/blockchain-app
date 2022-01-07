const router = require('express').Router()
const { placeOrder, getOrders, updateOrder } = require('../../controllers/order')
const { isAuthenticated } = require('../../controllers/AuthController')

// Place Order
router.post('/order/place', isAuthenticated, placeOrder);
router.get('/orders/:userId', isAuthenticated, getOrders),
router.put('/order/:id/edit', isAuthenticated, updateOrder)


module.exports = router;