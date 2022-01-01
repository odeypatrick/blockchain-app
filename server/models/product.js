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
        }
    ],
    description: {
        type: String,
    },
    price: {
        type: String,
        require: true,
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
    tailor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Product", productSchema)