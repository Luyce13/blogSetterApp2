const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const protect = asyncHandler(async (req, res, next) => {
    let token
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            if (!req.user) {
                res.status(401)
                throw new Error('No User, Not Authorized');
            }
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not Authorized')
    }
    if(!token){
        res.status(401)
        throw new Error('Not Authorized, No Token')
    }
})

module.exports = { protect }
