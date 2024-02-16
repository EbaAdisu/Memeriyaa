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
router.route('/:id').get(getCourse).patch(updateCourse).delete(deleteCourse)

module.exports = router
