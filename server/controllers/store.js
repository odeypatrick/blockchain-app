const Store = require('../models/store')

exports.createStore = (req, res) => {
    const newStore = Store(req.body);
    newStore.save(function (err, store) {
        if (err) {
            res.json({success: false, error: `Store creation failed --- ${err}`})
        }
        else {
            res.status(201).json({success: true, msg: 'Successfully added product'})
        }
    })
}

// Get store info by owner
exports.getStoreInfoByOwner = (req, res) => {
    Store.findOne({ owner: req.params.userId }).exec((err, store) => {
        if(err) {
            return res.status(500).json({ err })
        }
        return res.status(200).json(store)
    })
}

// Get store info by id
exports.getStoreInfoById = (req, res) => {
    Store.findOne({ _id: req.params.id }).exec((err, store) => {
        if(err) {
            return res.status(500).json({ err })
        }
        return res.status(200).json(store)
    })
}

// Edit Store Info