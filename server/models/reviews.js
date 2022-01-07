const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    userId: String,
    rating: {
            type: Number
    },
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
    }
}, { timestamps: true })

module.exports = mongoose.model("Review", reviewSchema)