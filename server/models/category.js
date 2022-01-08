const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }
    ],
    subCategories: {
        type: Array,
        default: []
    }
}, { timestamps: true })

module.exports = mongoose.model("Category", categorySchema)