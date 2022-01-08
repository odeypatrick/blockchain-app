const router = require('express').Router();
const { addProduct, getUserProducts, getSingleProduct, getProductsByCategory, searchProducts, updateProducts, deleteProduct } = require('../../controllers/product')
const { isAuthenticated } = require('../../controllers/AuthController')
const { upload } = require('../../controllers/upload')

router.post('/product', upload.array('images', 2), isAuthenticated, addProduct)                         // Add product route
router.get('/products/:userId', getUserProducts)                                 // Get products by tailor
router.get('/product/:id', getSingleProduct)                                     // Get products by id
router.get('/products/:category', getProductsByCategory)                         // Get products by category
router.get('/product/:searchParam/search', searchProducts)                                   // Search Products
router.put('/product/:id', isAuthenticated, updateProducts)                 // Update products
router.delete('/product/:id', isAuthenticated, deleteProduct)             // Delete Product 

module.exports = router;