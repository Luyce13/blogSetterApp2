const asyncHandler = require('express-async-handler')
const Profile = require('../models/profileModel')


const setProfile = asyncHandler(async (req, res) => {
    const { name, age, location, hobbies } = req.body
    if(!name || !age || !location || !hobbies ){
        res.status(400)
        throw new Error('Please Add All Fields')
    }
    const profile = await Profile.findByIdAndUpdate(req.user._id, req.body, {
        new: true, upsert: true
    })
    res.status(200).json(profile)
})

const getProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findById(req.params.id)
    res.status(200).json(profile)
})
module.exports = { setProfile, getProfile }
