const mongoose = require('mongoose')
const User = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            ref: 'Users',
        },
        role: {
            type: String,
            enum: ['Student', 'Admin', 'Instructor'],
            default: 'Student',
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', User)
