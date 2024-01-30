const express = require('express')
const router = express.Router()
const { setProfile,getProfile } = require('../controllers/profileControllers')
const { protect } = require('../middleware/authMiddleware')

router.post('/setProfile', protect, setProfile)
router.get('/getProfile/:id', protect, getProfile)

module.exports = router
