const express = require('express')
const router = express.Router()
const { registerUser, authenticateUser, getUser } = require('../controllers/userControllers')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', authenticateUser)
router.get('/', protect, getUser)

module.exports = router
