const mongoose = require('mongoose')
const User = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        username: {
            type: String,
            unique: true,
            trim: true,
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
