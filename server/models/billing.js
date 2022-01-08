const mongoose = require("mongoose");

const billingSchema = mongoose.Schema({
    cardNumber: {
        required: true,
        trim: true,
        type: String,
        unique: true
    },
    cardHolder: {
        required: true,
        trim: true,
        type: String,
    },
    expiryDate: String,
    cvv: String,
    cardType: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

module.exports = mongoose.model("Billing", billingSchema);