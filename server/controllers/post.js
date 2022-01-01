const Post = require('../models/post')

exports.addPost = (req, res) => {
    const newPost = Post(req.body)
    newPost.save((err, post) => {
        if(err) {
            return res.status(500).json({ err, success: false, msg: "Something went wrong" })
        } 
        return res.status(201).json({ msg: "Posted added successfully!" })
    })
}

// GET POSTS
exports.getPosts = (req, res) => {
    Post.find({}).exec((err, posts) => {
        if(err) {
            return res.status(500).json({ error: err, success: false, msg: "Something went wrong" })
        }
        return res.status(200).json(posts)
    })
}

// Get single Post
exports.getSinglePost = (req, res) => {
    Post.findOne({ _id: req.params.id }).exec()
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(err))
}

// Get a users post
exports.getUserPosts = (req, res) => {
    Post.find({ user: req.params.userId }).exec()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json(err))
}