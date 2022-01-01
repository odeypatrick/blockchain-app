const Product = require('../models/product')

// ADD PRODUCTS
exports.addProduct = (req, res) => {
    const newProduct = Product(req.body);
    newProduct.save(function (err, newUser) {
        if (err) {
            res.json({success: false, error: 'Cannot add product'})
        }
        else {
            res.status(201).json({success: true, msg: 'Successfully added product'})
        }
    })
}

// GET PRODUCTS FROM DATABASE USING DIFFERENT METHODS

// Get all products belonging to a single tailor
exports.getUserProducts = (req, res) => {
    Product.find({ tailor: req.params.userId }).exec((err, products) => {
        if(err)
            return res.status(500).json({ error: err, msg: "Could fetch products" })
        // If all is good
        return res.status(200).json(products)
    })
}

// Get single product
exports.getSingleProduct = (req, res) => {
    Product.findById(req.params.id).populate('reviews').exec((err, product) => {
        if(err)
            return res.status(500).json({ error: err, msg: "Could fetch product" })
        // If all is good
        return res.status(200).json(product)
    })
}

// Get product by category
exports.getProductsByCategory = (req, res) => {
    Product.find({ category: req.params.category }).exec((err, products) => {
        if(err)
            return res.status(500).json({ error: err, msg: "Could not fetch product" })
        // If all is good
        return res.status(200).json(products)
    })
}

// search products

// UPDATE PRODUCTs

// DELETE PRODUCT
exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id).exec()
    .then(res => {
        res.json({
            msg: "Producted deleted successfully"
        })
    })
    .catch(err => res.status(500).json({ error: `Product deletion failed - ${err}` }))
}