const Product = require('../models/product')
const { upload } = require('./upload')

// ADD PRODUCTS
exports.addProduct = (req, res) => {
    const newProduct = Product(req.body);
    newProduct.save(function (err, newUser) {
        if (err) return res.json({success: false, error: 'Cannot add product'})
        else res.status(201).json({success: true, msg: 'Successfully added product'})
    })
}

// GET PRODUCTS FROM DATABASE USING DIFFERENT METHODS

// Get all products belonging to a single tailor/clothier
exports.getUserProducts = (req, res) => {
    Product.find({ vendor: req.params.userId }).exec((err, products) => {
        if(err) return res.status(500).json({ error: err, msg: "Could not fetch products" })
        // If all is good
        return res.status(200).json(products)
    })
}

// Get single product
exports.getSingleProduct = (req, res) => {
    Product.findById(req.params.id).populate('reviews').exec((err, product) => {
        if(err) return res.status(500).json({ error: err, msg: "Could fetch product" })
        // If all is good
        return res.status(200).json(product)
    })
}

// Get product by category
exports.getProductsByCategory = (req, res) => {
    Product.find({ category: req.params.category }).exec((err, products) => {
        if(err) return res.status(500).json({ error: err, msg: "Could not fetch products" })
        // If all is good
        return res.status(200).json(products)
    })
}

// search products
exports.searchProducts = (req, res) => {
    const query = req.body.q;
    const searchQuery = query.toLowerCase()

    Product.find({ 
        $or: [{ name: { $regex: new RegExp(searchQuery) }}]
    })
    .then(products => res.status(200).json(products))
    .catch(err => res.status(500).json({ error: err, msg: "Could not fetch products" }))
}

// UPDATE PRODUCTs
exports.updateProducts = (req, res) => {
    const { name, category, description, price, variations, vendor } = req.body
    Product.findOneAndUpdate({ _id: req.params.id }, { $set: 
        { 
            name,
            category,
            description,
            price,
            variations,
            vendor,
        }
    })
    .then(product => {
        res.status(201).json({ product, msg: "Product updated successfully" })
    })
    .catch(err => res.status(500).json({ error: err, msg: "Something went wrong" }))
}

// DELETE PRODUCT
exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id).exec()
    .then(res => res.json({ msg: "Product deleted successfully" }))
    .catch(err => res.status(500).json({ error: `Could not delete product - ${err}` }))
}