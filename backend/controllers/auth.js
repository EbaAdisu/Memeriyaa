const Instructor = require('../models/Instructor')
const Student = require('../models/Student')
const Admin = require('../models/Admin')
const User = require('../models/User')
const { BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const signup = async (req, res) => {
    const { username, name, email, password, role } = req.body
    if (!username || !name || !email || !password) {
        throw new BadRequestError('Please Provide all the fields')
    }
    if (role !== 'Admin' && role !== 'Instructor' && role !== 'Student') {
        throw new BadRequestError('Please Provide a valid role')
    }

    let user
    let generalUser = await User.findOne({ username })
    if (generalUser) {
        throw new BadRequestError('Username already exists')
    }

    if (role === 'Admin') {
        user = await Admin.create({ username, name, email, password })
    } else if (role === 'Instructor') {
        user = await Instructor.create({ username, name, email, password })
    } else {
        user = await Student.create({ username, name, email, password })
    }
    await User.create({ id: user._id, username, role })
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
