const Instructor = require('../models/Instructor')
const Student = require('../models/Student')
const Admin = require('../models/Admin')
const { BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const signup = async (req, res) => {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) {
        throw new BadRequestError('Please Provide all the fields')
    }
    let user
    if (role === 'Admin') {
        user = await Admin.create({ name, email, password })
    } else if (role === 'Instructor') {
        user = await Instructor.create({ name, email, password })
    } else {
        user = await Student.create({ name, email, password })
    }
    const token = await user.JwtToken()
    res.status(StatusCodes.CREATED).json({ user, token })
}

const signin = async (req, res) => {
    const { email, password, role } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please Provide email and password')
    }
    let user
    if (role === 'Admin') {
        user = await Admin.findOne({ email })
    } else if (role === 'Instructor') {
        user = await Instructor.findOne({ email })
    } else {
        user = await Student.findOne({ email })
    }
    if (!user) {
        throw new BadRequestError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    // console.log(user)
    if (!isPasswordCorrect) {
        throw new BadRequestError('Invalid Credentials')
    }
    const token = await user.JwtToken()

    res.status(StatusCodes.OK).json({ user, token })
}

module.exports = {
    signup,
    signin,
}
