const router = require('express').Router()
const { 
    createStore, getStoreInfoById, getStoreInfoByOwner, getStoreInfoByStoreName, updateStore, updateStoreStatus, followStore, unfollowStore
} = require('../../controllers/store')
const { isAuthenticated } = require('../../controllers/AuthController')

// CREATE STORE
router.post('/store', isAuthenticated, createStore) 

// GET STOREINFO BY OWNER
router.get('/store/:userId/user', isAuthenticated, getStoreInfoByOwner)

// GET STOREINFO BY ID
router.get('/store/:id', getStoreInfoById)

// GET STOREINFO BY Storename
router.get('/store/:storeName/get', getStoreInfoByStoreName)

// UPDATE STORE INFO
router.put('/store/:id', isAuthenticated, updateStore)

//UPDATE STORE STATUS - OPEN/CLOSED
router.put('/store/:id/status', isAuthenticated, updateStoreStatus)

// Follow and unfollow store
router.put('/store/:id/follow', isAuthenticated, followStore)
router.put('/store/:id/unfollow', isAuthenticated, unfollowStore)

module.exports = router;