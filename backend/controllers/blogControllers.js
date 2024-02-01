const asyncHandler = require('express-async-handler')
const Blog = require('../models/blogModel')

const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find().populate('user').sort({createdAt:-1})
    
    res.status(200).json(blogs)
})

const createBlog = asyncHandler(async (req, res) => {
    const { title, subtitle, description, tags } = req.body
    if (
        !title ||
        !subtitle ||
        !description ||
        !tags
    ) {
        res.status(400)
        throw new Error('Please Add All Fields')
    }
    const blog = await Blog.create({
        title,
        subtitle,
        description,
        tags,
        user: req.user.id
    })
    res.status(200).json(blog)
})

const updateBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
        res.status(404)
        throw new Error('Blog Not Found')
    }
    if (blog.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedBlog)
})

const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
        res.status(404)
        throw new Error('Blog Not Found')
    }
    if (blog.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    await Blog.deleteOne(blog)
    res.status(200).json({message: 'Blog Deleted', id: req.params.id})
})

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog }
