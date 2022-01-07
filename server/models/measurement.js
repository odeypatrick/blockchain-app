const mongoose = require('mongoose')

const measurementSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
}, { timestamps: true })

module.exports = mongoose.model("Measurement", measurementSchema)