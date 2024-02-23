const mongoose = require('mongoose')
const CertificateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide Name'],
        minlength: [3, 'Name should be greater than 3 in length'],
        maxlenght: [50, 'Name should be less than 50'],
    },
    cousename: {
        type: String,
        required: [true, 'Please Provide Course Name'],
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
})

module.exports = CertificateSchema
