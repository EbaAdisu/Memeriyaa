const mongoose = require('mongoose')
const MileStoneSchema = new mongoose.Schema({
    milestoneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Milestone',
    },
    completed: {
        type: Boolean,
        default: false,
    },
})
const ProgressSchema = new mongoose.Schema({
    average: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        default: 0,
    },
})

const PersonalCourseSchema = new mongoose.Schema({
    coruseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    progress: ProgressSchema,
    completed: {
        type: Boolean,
        default: false,
    },
    duedate: {
        type: Date,
    },
    finaltrial: {
        type: Number,
        default: 3,
    },
    totalmilestones: {
        type: Number,
        default: 1,
    },
    milestones: [MileStoneSchema],
})

module.exports = PersonalCourseSchema
