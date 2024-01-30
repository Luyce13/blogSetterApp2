const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please Add Title'],
    },
    subtitle: {
        type: String,
        required: [true, 'Please Add Subtitle'],
    },
    description: {
        type: String,
        required: [true, 'Please Add Description'],
    },
    tags: {
        type: Array,
        required: [true, 'Please Add Tags'],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Blog', blogSchema)
