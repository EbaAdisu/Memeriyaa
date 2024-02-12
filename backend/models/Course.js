const mongoose = require('mongoose')
const MileStone = require('./MileStone')

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
        type: Date,
        default: Date.now() + 30 * 24 * 60 * 60 * 1000,
    },
    mileStone: [MileStone],
    price: {
        type: Number,
        default: 0,
    },
    rate: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('Course', CourseSchema)
