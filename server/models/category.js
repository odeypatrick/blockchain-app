const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    subCategories: [
        {
            type: String
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("Category", categorySchema)