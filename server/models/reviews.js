const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    userId: String,
    rating: {
        type: Number
    },
    comment: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
}, { timestamps: true })

module.exports = mongoose.model("Review", reviewSchema)