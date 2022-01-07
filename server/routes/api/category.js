const router = require('express').Router();
const { addCategory, deleteCategory, getAllCategory, getSingleCategory,updateCategory } = require('../../controllers/category')
const { isAuthenticated } = require('../../controllers/AuthController')

// Add Category
router.post('/category/add', isAuthenticated, addCategory)

// delete Category
router.delete('/category/:id/remove', isAuthenticated, deleteCategory)

// getAllCategory
router.get('/category/all', isAuthenticated, getAllCategory)

// Get single Category
router.get('/category/:name', isAuthenticated, getSingleCategory)

// Update category
router.put('/category/:id/edit', isAuthenticated, updateCategory)

module.exports = router;