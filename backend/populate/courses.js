const Course = require('../models/Course')
const courses = require('./courses.json')

const connectDB = require('../db/connect')
require('dotenv').config()
connectDB(process.env.MONGO_URI)

const populateCourses = async () => {
    try {
        await Course.deleteMany()
        await Course.create(courses)
        console.log('Course created')
    } catch (error) {
        console.log(error)
    }
}
populateCourses()
