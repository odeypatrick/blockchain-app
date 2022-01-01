const router = require('express').Router();
const { addPost, getPosts, getSinglePost, getUserPosts } = require('../../controllers/post')
const { isAuthenticated } = require('../../controllers/AuthController')

// Add Post
router.post('/post/add', isAuthenticated, addPost)

// Get post
router.get('post/all', isAuthenticated, getPosts)

// Get s single post by post ID
router.get('/post/:id', getSinglePost)

// Get a users' post
router.get('/post/user/:userId', isAuthenticated, getUserPosts)

module.exports = router;