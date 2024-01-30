const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please Add Email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Add Email'],
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
