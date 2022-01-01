const router = require('express').Router();
const { addProduct, getUserProducts, getSingleProduct, getProductsByCategory, deleteProduct } = require('../../controllers/product')
const { isAuthenticated } = require('../../controllers/AuthController')

router.post('/product/add', isAuthenticated, addProduct)                         // Add product route
router.get('/products/:userId', getUserProducts)                                 // Get products by tailor
router.get('/product/:id', getSingleProduct)                                     // Get products by id
router.get('/products/:category', getProductsByCategory)                         // Get products by category
router.delete('/product/:id/delete', isAuthenticated, deleteProduct)             // Delete Product 

module.exports = router;