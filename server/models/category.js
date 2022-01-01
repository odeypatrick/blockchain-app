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
})

module.exports = mongoose.model("Category", categorySchema)