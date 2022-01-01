const Review = require('../models/reviews')

exports.addReview = (req, res) => {
    const newReview = Review(req.body);
    newReview.save(function (err, review) {
        if (err) {
            res.json({success: false, error: 'Cannot add Review'})
        }
        else {
            res.status(201).json({success: true, msg: 'Successfully added product'})
        }
    })
}

// exports.getProductReview = (req, res) => {
//     Review.findOne({  })
// }