const router = require('express').Router();
const { addPost, getPosts, getSinglePost, getUserPosts, updatePost, likePost, getTimelinePosts } = require('../../controllers/post')
const { isAuthenticated } = require('../../controllers/AuthController')

// Add Post
router.post('/post', isAuthenticated, addPost)

// Get posts
router.get('/posts', getPosts)

// Get single post by post ID
router.get('/post/:id', getSinglePost)

// Get a users' post
router.get('/post/:userId/user', isAuthenticated, getUserPosts)

// update posts
router.put('/post/:id', isAuthenticated, updatePost)

// Like Post / Dislike Post
router.put('/post/:id/like', isAuthenticated, likePost)

// Get timeline posts
router.get("post/:userId/timeline", isAuthenticated, getTimelinePosts)

module.exports = router;