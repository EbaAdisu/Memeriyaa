const mongoose = require('mongoose')
const MileStone = require('./MileStone')

const { subject, level, language } = require('./enums')

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide Name'],
        minlength: [3, 'Name should be greater than 3 in length'],
        maxlenght: [20, 'Name should be less than 20'],
    },
    description: {
        type: String,
        required: [true, 'Please Provide Description'],
        minlength: [10, 'Description should be greater than 10 in length'],
        maxlenght: [200, 'Description should be less than 200'],
    },
    duration: {
        type: Number,
        default: 30,
    },
    milestones: [MileStone],
    price: {
        type: Number,
        min: [0, 'Price should be greater than 0'],
        default: 0,
    },
    rate: {
        type: Number,
        default: 0,
    },
    level: {
        type: String,
        enum: level,
        required: [true, 'Please Provide Level'],
    },
    subject: {
        type: String,
        enum: subject,
        required: [true, 'Please Provide Subject'],
    },
    language: {
        type: String,
        enum: language,
        required: [true, 'Please Provide Language'],
    },
})

module.exports = mongoose.model('Course', CourseSchema)
