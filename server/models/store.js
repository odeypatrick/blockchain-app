const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
    storeName: {
        type: String,
        trim: true,
        lowercase: true
    },
    displayImage: Buffer,
    storeDiscription: String,
    websiteLink: String,
    active: {
        type: Boolean,
        default: true
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
})

module.exports = mongoose.model("Store", storeSchema)