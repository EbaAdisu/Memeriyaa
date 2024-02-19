const express = require('express')
const router = express.Router()
const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    addMilestones,
    getMilestones,
    updateMilestones,
    deleteMilestones,
} = require('../controllers/courses')

router.route('/').post(createCourse).get(getCourses)
router.route('/:id').get(getCourse).patch(updateCourse).delete(deleteCourse)
router.route('/:id/milestones').post(addMilestones).get(getMilestones)
router
    .route('/:courseId/milestones/:milestoneId')
    .patch(updateMilestones)
    .delete(deleteMilestones)

module.exports = router
