const mongoose = require('mongoose')
const commentSchema = require('./CommentSchema')
const FeedBackSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: [true, 'Please provide Course Id'],
    },
    comments: [commentSchema],
    totalRating: {
        type: Number,
        default: 0,
        required: [true, 'Please provide total rating'],
    },
    feedbackQuantity: {
        type: Number,
        default: 0,
        required: [true, 'Please provide feedback quantity'],
    },
})
module.exports = mongoose.model('FeedBack', FeedBackSchema)
