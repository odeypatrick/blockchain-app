const Review = require('../models/reviews')
const Product = require('../models/product')


exports.addReview = (req, res) => {
    const newReview = Review(req.body);
    newReview.save((err, review) => {
        if (err) {
            res.json({success: false, error: 'Cannot add Review'})
        }
        else {
            Product.findOneAndUpdate(
                { _id: req.body.productId }, 
                { $push: { reviews: review } },
            ).then(() => {
                return res.status(200).json({ msg: "Review added successfully" })
            })
        }
    })
}