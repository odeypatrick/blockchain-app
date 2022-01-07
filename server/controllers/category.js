const Category = require('../models/category')

// ADD CATEGORY
exports.addCategory = (req, res) => {
    const newCategory = Category(req.body);
    newCategory.save(function (err, category) {
        if (err) {
            res.json({success: false, error: 'Cannot add category'})
        }
        else {
            res.status(201).json({success: true, msg: 'Successfully added category'})
        }
    })
}

// DELETE CATEGORY
exports.deleteCategory = (req, res) => {
    Category.findByIdAndDelete(req.params.id).exec()
    .then(res => {
        res.json({
            msg: "Category deleted successfully"
        })
    })
    .catch(err => res.status(500).json({ error: `Could not delete - ${err}` }))
}

// Get all Category
exports.getAllCategory = (req, res) => {
    Category.find({}).exec()
    .then(categories => {
        res.status(200).json(categories)
    })
    .catch(err => res.status(500).json({ err }))
}

// GET SINGLE CATEGORY BY NAME
exports.getSingleCategory = (req, res) => {
    Category.findOne({ name: req.params.name }).exec()
    .then(category => res.status(200).json(category))
    .catch(err => res.status(500).json(err))
}

// UPDATE CATEGORY
exports.updateCategory = (req, res) => {
    Category.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then(category => {
        res.status(201).json({ category, msg: "Category updated successfully" })
    })
    .catch(err => res.status(500).json({ error: err, msg: "Something went wrong" }))
}