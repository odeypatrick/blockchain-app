const Billing = require('../../models/billing')

// Add card details
exports.addCard = (req, res) => {
    Billing.create(req.body)
    .then(data => res.json({ msg: "Card details added successfully", data }))
    .catch(err => res.status(500).json(err))
}

// Get Card details
exports.getCard = (req, res) => {
    Billing.findOne({ userId: req.params.userId }).exec()
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
}

// Update card details
exports.updateCard = (req, res) => {
    Billing.findByIdAndUpdate(req.params.id).exec()
    .then(data => res.json({ msg: "Card details updated successfully", data }))
    .catch(err => res.status(500).json(err))
}

// Delete Card Details
exports.deleteCard = (req, res) => {
    Billing.findByIdAndDelete(req.params.id).exec()
    .then(data => res.json({ msg: "Card details deleted successfully", data }))
    .catch(err => res.status(500).json(err))
}