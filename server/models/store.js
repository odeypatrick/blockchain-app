const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
    storeName: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    description: String,
    websiteLink: String,
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    active: {
        type: Boolean,
        default: true
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

module.exports = mongoose.model("Store", storeSchema)