const { StatusCodes } = require('http-status-codes')
const Student = require('../models/Student')
const User = require('../models/User')
const { NotFoundError, BadRequestError } = require('../errors')

const getStudents = async (req, res) => {
    const students = await Student.find({})
    res.status(200).json({ students })
}

const getStudent = async (req, res) => {
    const { id } = req.params
    const student = await Student.findOne({ _id: id })
    if (!student) {
        throw new NotFoundError('Student not found')
    }
    res.status(StatusCodes.OK).json({ student })
}

const updateStudent = async (req, res) => {
    const { id } = req.params
    const { name, email, bio } = req.body
    let updates = {}
    if (name) updates.name = name
    if (email) updates.email = email
    if (bio) updates.bio = bio
    const student = await Student.findOneAndUpdate({ _id: id }, updates, {
        new: true,
        runValidators: true,
    })
    if (!student) {
        throw new NotFoundError('Student not found')
    }
    res.status(StatusCodes.OK).json({ student })
}

const deleteStudent = async (req, res) => {
    const { id } = req.params
    const student = await Student.findOneAndDelete({ _id: id })
    if (!student) {
        throw new NotFoundError('Student not found')
    }
    res.status(StatusCodes.OK).json({ student })
}

const updateUsername = async (req, res) => {
    const { id } = req.params
    const { username } = req.body
    if (!username) {
        throw new BadRequestError('Invalid username')
    }

    let generalUser = await User.findOne({ username })
    if (generalUser) {
        throw new BadRequestError('Username Not Available')
    }
    const student = await Student.findOneAndUpdate(
        { _id: id },
        { username },
        { new: true, runValidators: true }
    )
    if (!student) throw new NotFoundError('Student Not Found')

    const user = await User.findOneAndUpdate(
        { id: id },
        { username },
        { new: true, runValidators: true }
    )
    if (!user) throw new NotFoundError('User Not Found')

    res.status(StatusCodes.OK).json({ student })
}

const updatePassword = async (req, res) => {
    const { id } = req.params
    const { password } = req.body
    if (!password) throw new BadRequestError('Invalid Password')

    const student = await Student.findOne({ _id: id })
    if (!student) throw new NotFoundError('Student Not Found')
    student.password = password
    await student.save()
    res.status(StatusCodes.OK).json({ student })
}

const buyPremium = async (req, res) => {
    const { id } = req.params
    // const { premium } = req.body
    // if (!premium) throw new BadRequestError('Please provide premium')
    const student = await Student.findOneAndUpdate(
        { _id: id },
        { premium: true },
        { new: true, runValidators: true }
    )
    if (!student) throw new NotFoundError('Student Not Found')
    res.status(StatusCodes.OK).json({ student })
}

module.exports = {
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    updateUsername,
    updatePassword,
    buyPremium,
}
