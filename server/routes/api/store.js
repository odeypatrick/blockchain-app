const router = require('express').Router()
const { createStore, getStoreInfoById, getStoreInfoByOwner  } = require('../../controllers/store')

// CREATE STORE
router.post('/store/create', createStore) 

// GET STOREINFO BY OWNER
router.get('/store/user/:userId/', getStoreInfoByOwner)

// GET STOREINFO BY ID
router.get('/store/:userId/', getStoreInfoById)

module.exports = router;