const mongoose = require("mongoose");

const billingSchema = mongoose.Schema({
    cardNumber: String,
    cardHolder: String,
    expiryDate: String,
    cvv: String,
    cardType: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Billing", billingSchema);