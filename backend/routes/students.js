const express = require('express')
const router = express.Router()

const {
    getStudents,
    getStudent,
    updateStudent,
    updateUsername,
    deleteStudent,
} = require('../controllers/students')

router.route('/').get(getStudents)
router.route('/:id').get(getStudent).patch(updateStudent).delete(deleteStudent)
router.route('/:id/username').patch(updateUsername)

module.exports = router
