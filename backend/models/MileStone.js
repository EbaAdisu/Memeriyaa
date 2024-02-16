const mongoose = require('mongoose')

const MileStoneSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: [true, 'Please Provide Id'],
    // },
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
    resource: {
        type: String,
        required: [true, 'Please Provide Resource'],
        match: [
            /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
            'Invalid download link format',
        ],
    },
})

module.exports = MileStoneSchema
