const FeedBack = require('../models/FeedBack')
const Course = require('../models/Course')
const { StatusCodes } = require('http-status-codes')

const addFeedback = async (req, res) => {
    const { id } = req.params
    let { comment, rate } = req.body

    if (rate < 1) rate = 1
    if (rate > 5) rate = 5

    let course = await FeedBack.findOne({ courseId: id })
    if (!course) {
        course = await FeedBack.create({
            courseId: id,
            comments: [
                {
                    id: req.user.id,
                    username: req.user.username,
                    comment,
                    rate,
                },
            ],
            totalRating: rate,
            feedbackQuantity: 1,
        })
        rateCourse(id, rate, 1)
        return res.status(StatusCodes.OK).json({ course })
    }

    const comments = course.comments
    const prevFeedback = comments.find((comment) => comment.id === req.user.id)
    if (prevFeedback) {
        prevFeedback.username = req.user.username
        prevFeedback.comment = comment
        course.totalRating = course.totalRating - prevFeedback.rate + rate
        prevFeedback.rate = rate
    } else {
        course.comments.push({
            id: req.user.id,
            username: req.user.username,
            comment,
            rate,
        })
        course.totalRating += rate
        course.feedbackQuantity += 1
    }
    await course.save()
    rateCourse(id, course.totalRating, course.feedbackQuantity)
    res.status(StatusCodes.OK).json({ course })
}

const getFeedbacks = async (req, res) => {
    const { id } = req.params
    const feedback = await FeedBack.find({ courseId: id })
    res.status(StatusCodes.OK).json({ feedback })
}

const rateCourse = async (id, totalRating, feedbackQuantity) => {
    const rate = totalRating / feedbackQuantity
    await Course.findOneAndUpdate(
        { _id: id },
        { rate: rate },
        { new: true, runValidators: true }
    )
}

module.exports = {
    addFeedback,
    getFeedbacks,
}
