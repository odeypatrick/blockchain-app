const Post = require('../models/post')
const User = require('../models/user')

exports.addPost = (req, res) => {
    if(req.user.role == 1 || req.user.role == 2) {
      const newPost = Post(req.body)
      newPost.save((err, post) => {
          if(err) {
              return res.status(500).json({ err, success: false, msg: "Something went wrong" })
          } 
          return res.status(201).json({ msg: "Posted added successfully!" })
      })
    } else{
      res.sendStatus(401)
    }
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
    Post.find({ userId: req.params.userId }).exec()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json(err))
}

// Update Post
exports.updatePost = (req, res) => {
    if(req.user.role == 1 || req.user.role == 2) {
      Post.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then(post => {
          res.status(201).json({ post, msg: "Post updated successfully" })
      })
      .catch(err => res.status(500).json({ error: err, msg: "Something went wrong" }))
    }
}

// Like/Dislike a post 
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
          await post.updateOne({ $push: { likes: req.body.userId } });
          res.status(200).json({ msg: "The post has been liked" });
        } else {
          await post.updateOne({ $pull: { likes: req.body.userId } });
          res.status(200).json({ msg: "The post has been disliked" });
        }
      } catch (err) {
        res.status(500).json(err);
      }
}

// Get Timeline Post
exports.getTimelinePosts = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
          currentUser.followings.map((friendId) => {
            return Post.find({ storeId: friendId }).populate('storeId').exec();
          })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
      } catch (err) {
        res.status(500).json(err);
      }
}