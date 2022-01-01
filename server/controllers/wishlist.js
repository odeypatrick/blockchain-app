const Wishlist = require('../models/wishlist')

// ADD PRODUCTS TO WISHLIST
exports.addProducts = (req, res) => {
    const newProduct = Wishlist(req.body);
    newProduct.save(function (err, product) {
        if (err) {
            res.json({success: false, error: `Something went wrong --- ${err}`})
        }
        else {
            res.status(201).json({success: true, msg: 'Successfully added product'})
        }
    })
}

// REMOVE PRODUCTS FROM WISHLIST
exports.removeProducts = (req, res) => {
    Wishlist.findByIdAndDelete(req.params.id).exec()
    .then(product => res.status(200).json({ msg: "Producted deleted succcessfully" }))
    .catch(err => res.status(500).json({ msg: "Something went wrong" }))
}