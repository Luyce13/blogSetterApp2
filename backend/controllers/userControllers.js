const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please Add All Fields')
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(409)
        throw new Error('Invalid Request, User Already Exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({ email, password: hashedPassword })
    if(user){
        res.status(201).json({id: user._id, email: user.email, token: generateToken(user._id)})
    }else{
        res.status(400)
        throw new Error('Invalid Data')
    }
})

const authenticateUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please Add All Fields')
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({id: user._id, email: user.email, token: generateToken(user._id)})
    }else{
        res.status(401)
        throw new Error('Invslid Credentials')
    }
})

const getUser = asyncHandler(async (req, res) => {

    res.status(200).json(req.user)
})

const generateToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET )
}

module.exports = { registerUser, authenticateUser, getUser }
