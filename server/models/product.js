const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }, 
    category: {
        type: String,
        required: true
    },
    images:{
        type: Array,
        default: []
    },
    description: {
        type: String,
    },
    price: {
        type: String,
        required: true,
    },
    totalQuantity: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    variations: {
        type: Object,
        default: {}
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review" 
        }
    ],
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)