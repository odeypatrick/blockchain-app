const router = require('express').Router();
const { addReview } = require('../../controllers/review')
const { isAuthenticated } = require('../../controllers/AuthController')

// ADD REVIEW
router.post('/review/add', isAuthenticated, addReview)

module.exports = router;