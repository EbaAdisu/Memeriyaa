const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: [true, 'Please Provide Username'],
            ref: 'Student',
        },
        comment: {
            type: String,
        },
        rate: {
            type: Number,
            min: 1,
            max: 5,
            default: 5,
        },
    },
    { timestamps: true }
)

module.exports = commentSchema
