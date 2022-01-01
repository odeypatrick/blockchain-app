const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    rating: [
        {
            type: Number
        }
    ],
    comment: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Review", reviewSchema)