const Store = require('../models/store')
const User = require('../models/user')

exports.createStore = (req, res) => {
    const newStore = Store(req.body);
    newStore.save(function (err, store) {
        if (err) {
            res.json({success: false, error: `Store creation failed --- ${err}`})
        }
        else {
            User.findOneAndUpdate({ _id: req.body.userId }, { $set: 
                { 
                    store,
                }
            })
            .then(user => {
                if(user) res.json({ success: true, error: `Store creation successfull` }) 
                else res.json({ success: true, error: `Store creation failed` })
            })
            .catch(err => res.status(500).json({ error: err }))
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

// Get store info by Store Name
exports.getStoreInfoByStoreName = (req, res) => {
    Store.findOne({ storeName: req.params.storeName }).exec((err, store) => {
        if(err) {
            return res.status(500).json({ err })
        }
        return res.status(200).json(store)
    })
}

// Edit Store Info
exports.updateStore = (req, res) => {
    const { storeName, storeDescription, websiteLink } = req.body
    Store.findOneAndUpdate({ _id: req.params.id }, { $set: 
        { 
            storeName,
            storeDescription,
            websiteLink,
            updatedAt: Date.now
        }
    })
    .then(store => {
        res.status(201).json({ store, msg: "Store updated successfully" })
    })
    .catch(err => res.status(500).json({ error: err }))
}

// Open or Close store
exports.updateStoreStatus = (req, res) => {
    Store.findOne({ _id: req.params.id })
    .then(store => {
        Store.findOneAndUpdate({ storeName: req.body.storeName }, { $set: 
            { 
                active: !store.active
            }
        })
        .then(store => {
            res.status(201).json({ store, msg: "Store status updated successfully" })
        })
        .catch(err => res.status(500).json({ error: err }))
    })
    .catch(err => res.status(500).json({ error: err }))
} 

exports.followStore = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
          const store = await Store.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (!store.followers.includes(req.body.userId)) {
            await store.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json({msg: "Store has been followed"});
          } else {
            res.status(403).json({msg: "you already follow this Store"});
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json({msg: "you can't follow Yourself"});
      }
}

exports.unfollowStore = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
          const store = await Store.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (store.followers.includes(req.body.userId)) {
            await store.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("Store has been unfollowed");
          } else {
            res.status(403).json("you don't follow this store");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you can't unfollow yourself");
      }
}