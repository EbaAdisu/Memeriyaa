const express = require('express')
const router = express.Router()
const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
} = require('../controllers/courses')

router.route('/').post(createCourse).get(getCourses)

module.exports = router
