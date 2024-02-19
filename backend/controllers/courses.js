const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
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
    const { subject, level, language, name, sort, fields } = req.query
    let query = {}
    if (subject) query.subject = subject.split(',')
    if (level) query.level = level.split(',')
    if (language) query.language = language.split(',')
    if (name) query.name = { $regex: name, $options: 'i' }

    let sorting = '-createdAt'
    if (sort) sorting = sort.split(',').join(' ')

    let field = ''
    if (fields) field = fields.split(',').join(' ')

    const courses = await Course.find(query).sort(sorting).select(field)
    res.status(StatusCodes.OK).json({ length: courses.length, courses })
}

const getCourse = async (req, res) => {
    const { id } = req.params
    const course = await Course.findOne({ _id: id })
    if (!course) {
        throw new NotFoundError('Course not found')
    }
    res.status(StatusCodes.OK).json({ course })
}

const updateCourse = async (req, res) => {
    const { id } = req.params
    const { name, description, duration, price, level, subject, language } =
        req.body
    let updates = {}
    if (name) updates.name = name
    if (description) updates.description = description
    if (duration) updates.duration = duration
    if (level) updates.level = level
    if (subject) updates.subject = subject
    if (language) updates.language = language
    if (price !== undefined) updates.price = price

    const course = await Course.findOneAndUpdate({ _id: id }, updates, {
        new: true,
        runValidators: true,
    })
    if (!course) {
        throw new NotFoundError('Course not found')
    }
    res.status(StatusCodes.OK).json({ course })
}

const deleteCourse = async (req, res) => {
    const { id } = req.params
    const course = await Course.findOneAndDelete({ _id: id })
    if (!course) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: 'Course not found' })
    }
    res.status(StatusCodes.OK).json({ message: 'Course deleted', course })
}

const addMilestones = async (req, res) => {
    const { id } = req.params
    const milestones = req.body
    const course = await Course.findOne({ _id: id })
    if (!course) {
        throw new NotFoundError('Course not found')
    }
    if (!milestones) {
        throw new BadRequestError('Please provide milestones')
    }
    course.milestones.push(milestones)
    await course.save()
    res.status(StatusCodes.CREATED).json({ milestones: course.milestones })
}

const getMilestones = async (req, res) => {
    const { id } = req.params
    const course = await Course.findOne({ _id: id })
    if (!course) {
        throw new NotFoundError('Course not found')
    }
    res.status(StatusCodes.OK).json({ milestones: course.milestones })
}

const updateMilestones = async (req, res) => {
    const { courseId, milestoneId } = req.params
    const updates = req.body
    const course = await Course.findOne({ _id: courseId })
    if (!course) {
        throw new NotFoundError('Course not found')
    }
    const milestone = course.milestones.id(milestoneId)

    if (!milestone) {
        throw new NotFoundError('Milestone not found')
    }
    if (updates.name) milestone.name = updates.name
    if (updates.description) milestone.description = updates.description
    if (updates.resource) milestone.resource = updates.resource
    await course.save()
    res.status(StatusCodes.OK).json({ milestone })
}

const deleteMilestones = async (req, res) => {
    const { courseId, milestoneId } = req.params
    const course = await Course.findOne({ _id: courseId })
    if (!course) {
        throw new NotFoundError('Course not found')
    }
    let milestones = course.milestones
    if (!milestones) {
        throw new NotFoundError('Milestones not found')
    }
    milestones = milestones.filter((milestone) => milestone._id != milestoneId)
    if (milestones.length < 3) {
        throw new BadRequestError('Course should have at least 3 milestones')
    } else if (milestones.length === course.milestones.length) {
        throw new NotFoundError('Milestone not found')
    }
    course.milestones = milestones
    await course.save()
    res.status(StatusCodes.OK).json({
        milestones: course.milestones,
        message: 'Milestone deleted',
    })
}

module.exports = {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    addMilestones,
    getMilestones,
    updateMilestones,
    deleteMilestones,
}
