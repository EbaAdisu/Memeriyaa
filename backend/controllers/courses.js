const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const Course = require('../models/Course')

const createCourse = async (req, res) => {
    const {
        name,
        description,
        price,
        milestones,
        subject,
        level,
        language,
        duration,
    } = req.body
    if (
        !name ||
        !description ||
        !milestones ||
        !subject ||
        !level ||
        !language
    ) {
        throw new BadRequestError('Please Provide all values')
    }
    if (milestones.length < 3) {
        throw new BadRequestError('Please Provide at least 3 milestones')
    }
    // duration = year-month-day
    if (duration && duration < 14) {
        throw new BadRequestError('Duration should be greater than 14 days')
    }

    const course = await Course.create({
        name,
        description,
        duration,
        price,
        milestones,
        subject,
        level,
        language,
    })
    res.status(StatusCodes.CREATED).json({ course })
}

const getCourses = async (req, res) => {
    const courses = await Course.find({})
}
const getCourse = async (req, res) => {}
const updateCourse = async (req, res) => {}
const deleteCourse = async (req, res) => {}

module.exports = {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
}
