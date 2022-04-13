const router = require('express').Router();
const { signup, login, isAuthenticated, getUserData, updateUser, forgotPassword, resetPassword } = require('../../controllers/AuthController')
const { upload } = require('../../controllers/upload')

router.post('/signup', signup)
router.post('/login', login)
router.get('/user', isAuthenticated, getUserData)
router.put('/user/:id/edit', upload.single('profileImage'), isAuthenticated, updateUser)
router.put('/forgot-password', forgotPassword)
router.put('reset-password', resetPassword)


module.exports = router;