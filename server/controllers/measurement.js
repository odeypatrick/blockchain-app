const Measurement = require('../models/measurement')

// Add Measurement
exports.addMeasurement = (req, res) => {
    Measurement.create(req.body)
    .then(measurement => res.status(201).json({  
        success: true,
        measurement, 
        msg: "Measurement successfully added" 
    }))
    .catch(err => res.status(500).json({ success: false, error: err, msg: "Could not add measurement" }))
}

exports.getUsersMeasurement = (req, res) => {
    Measurement.findOne({ userId: req.params.userId }).exec()
    .then(measurement => {
        return res.status(200).json(measurement)
    })
    .catch(err => res.status(500).json(err))
}

exports.updateMeasurement = (req, res) => {
    Measurement.findOneAndUpdate({ userId: req.body.userId }, { $set: req.body }).exec()
    .then(measurement => {
        return res.status(200).json({
            success: true,
            measurement,
            msg: "Successfully updated measurement"
        })
        .catch(err => res.status(500).json({ success: false, error: err, msg: "Could not update measurement" }))
    })
}

exports.deleteMeasurement = (req, res) => {
    Measurement.findByIdAndDelete(req.params.id).exec()
    .then(res => {
        return res.json({ msg: "Measurement deleted" })
    })
    
}