const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        max: 500,
    },
    photos: {
        type: Array,
        default: [],
        required: true
    },
    likes: {
        type: Array,
        default: [],
    },
}, { timestamps: true })

module.exports = mongoose.model("Post", postSchema)