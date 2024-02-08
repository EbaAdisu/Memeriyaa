const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const InsturctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide Name'],
        minlength: [3, 'Name should be greater than 3 in length'],
        maxlenght: [20, 'Name should be less than 20'],
    },
    email: {
        type: String,
        required: [true, 'Please Provide Email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password'],
        minlength: [6, 'Name should be equal or greater than 6 in length'],
        maxlenght: [71, 'Name should be less than 72'],
    },
    role: {
        type: String,
        default: 'Instructor',
    },
})
InsturctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
InsturctorSchema.methods.comparePassword = async function (canditatePassword) {
    return await bcrypt.compare(canditatePassword, this.password)
}
InsturctorSchema.methods.JwtToken = async function () {
    return await jwt.sign(
        { name: this.name, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    )
}

module.exports = mongoose.model('Insturctor', InsturctorSchema)
