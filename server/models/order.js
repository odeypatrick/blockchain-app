const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    confirmed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema)