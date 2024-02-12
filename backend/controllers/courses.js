const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const Course = require('../models/Course')

const createCourse = async (req, res) => {
    const { name, description, duration, price, mileStone } = req.body
    if (!name || !description || !price || !mileStone) {
        throw new BadRequestError('Please Provide all values')
    }
    if (mileStone.length < 3) {
        throw new BadRequestError('Please Provide at least 3 MileStones')
    }
    const course = await Course.create({
        name,
        description,
        duration,
        price,
        mileStone,
    })
    res.status(StatusCodes.CREATED).json({ course })
}

const getCourses = async (req, res) => {}
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
