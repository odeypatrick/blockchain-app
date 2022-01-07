const router = require('express').Router();
const { addPost, getPosts, getSinglePost, getUserPosts, updatePost, likePost, getTimelinePosts } = require('../../controllers/post')
const { isAuthenticated } = require('../../controllers/AuthController')

// Add Post
router.post('/post/add', isAuthenticated, addPost)

// Get post
router.get('post/all', isAuthenticated, getPosts)

// Get s single post by post ID
router.get('/post/:id', getSinglePost)

// Get a users' post
router.get('/post/user/:userId', isAuthenticated, getUserPosts)

// update posts
router.put('/post/:id/edit', isAuthenticated, updatePost)

// Like Post / Dislike Post
router.put('/post/:id/like', isAuthenticated, likePost)

// Get timeline posts
router.get("post/timeline/:userId", isAuthenticated, getTimelinePosts)

module.exports = router;