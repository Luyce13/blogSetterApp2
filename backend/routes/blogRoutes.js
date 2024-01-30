const express = require('express')
const router = express.Router()
const { getBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blogControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/', getBlogs)
router.post('/create', protect, createBlog)
router.put('/update/:id', protect, updateBlog)
router.delete('/delete/:id', protect, deleteBlog)

module.exports = router
