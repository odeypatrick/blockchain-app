const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    }, 
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    images: [
        {
            type: String,
            default: ""
        },
    ],
    description: {
        type: String,
    },
    price: {
        type: String,
        require: true,
    },
    totalQuantity: {
        type: Number,
        require: true
    },
    available: {
        type: Boolean,
        default: true
    },
    variations: [
        {
            type: Object
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review" 
        }
    ],
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)