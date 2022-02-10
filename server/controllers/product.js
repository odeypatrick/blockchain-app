const Product = require('../models/product')
const Category = require('../models/category')
const Post = require('../models/post')

// ADD PRODUCTS
exports.addProduct = (req, res) => {
    if(req.user.role == 1 || req.user.role == 2) {
        const { name, category, description, price, totalQuantity, variations, vendorId } = req.body
        const newProduct = Product({
            name, 
            category,
            images: req.files.location,
            description,
            price,
            totalQuantity,
            variations,
            vendorId,
            storeId
        });
        // Save product
        newProduct.save(function (err, newProduct) {
            if (err) return res.json({success: false, error: 'Cannot add product'})
            else {
                // Push Product to category
                Category.updateOne({ name: req.body.category }, { $push: { products: newProduct } })
                .then(() => {
                    // Create a new post after the product is uploaded
                    Post.create({
                        storeId: req.body.storeId,
                        description: req.body.description,
                        photos: newProduct.images
                    }, (err, post) => {
                        if(err) {
                            return res.status(500).json({success: false, error: 'An error occured while creating Post'})
                        }
                        res.status(201).json({success: true, msg: 'Product addition successful', post})
                    })
                })
                .catch(err => res.status(500).json(err))
            }
        })
    } else {
        res.sendStatus(401)
    }
}

// GET PRODUCTS FROM DATABASE USING DIFFERENT METHODS

// Get all products belonging to a single tailor/clothier
exports.getUserProducts = (req, res) => {
    Product.find({ vendorId: req.params.userId }).exec((err, products) => {
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
    const query = req.params.searchParam;
    const searchQuery = query.toLowerCase()

    Product.find({ 
        $or: [{ name: { $regex: new RegExp(searchQuery) }}]
    })
    .then(products => res.status(200).json(products))
    .catch(err => res.status(500).json({ error: err, msg: "Could not fetch products" }))
}

// UPDATE PRODUCTs
exports.updateProducts = (req, res) => {
    if(req.user.role == 1 || req.user.role == 2) {
        const { name, category, description, price, variations, vendorId } = req.body
        Product.findOneAndUpdate({ _id: req.params.id }, { $set: 
            { 
                name,
                category,
                description,
                price,
                variations,
                vendorId,
            }
        })
        .then(product => {
            res.status(201).json({ product, msg: "Product updated successfully" })
        })
        .catch(err => res.status(500).json({ error: err, msg: "Something went wrong" }))
    } else {
        res.sendStatus(401)
    }
}

// DELETE PRODUCT
exports.deleteProduct = (req, res) => {
    if(req.user.role == 1 || req.user.role == 2) {
        Product.findByIdAndDelete(req.params.id).exec()
        .then(res => res.json({ msg: "Product deleted successfully" }))
        .catch(err => res.status(500).json({ error: `Could not delete product - ${err}` }))
    } else {
        res.sendStatus(401)
    }
}