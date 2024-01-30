const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please Add Name'],
    },
    age: {
        type: String,
        required: [true, 'Please Add Email'],
    },
    location: {
        type: String,
        required: [true, 'Please Add Email'],
    },
    hobbies: {
        type: Array,
        required: [true, 'Please Add Email'],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Profile', profileSchema)
