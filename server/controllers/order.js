const Order = require('../models/order')

exports.placeOrder = () => {
    const newOrder = Order(req.body);
    newOrder.save( (err, order) => {
        if (err) return res.json({success: false, error: 'Cannot place order'})
        res.status(201).json({success: true, msg: 'Successfully placed order, please await confirmation'})
    })
}

// Get orders belonging to a user
exports.getOrders = (req, res) => {
    Order.find({ userId: req.params.userId }).populate('products').exec()
    .then(orders => res.status(200).json(orders))
    .catch(err => res.status(500).json(err))
}

// Edit Order
exports.updateOrder = (req, res) => {
    Order.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then(order => {
        res.status(201).json({ order, msg: "Order updated successfully" })
    })
    .catch(err => res.status(500).json({ error: err, msg: "Something went wrong" }))
}