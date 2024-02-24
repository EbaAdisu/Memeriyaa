const express = require('express')
const router = express.Router()

const {
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    updateUsername,
    updatePassword,
    buyPremium,
} = require('../controllers/students')

router.route('/').get(getStudents)
router.route('/:id').get(getStudent).patch(updateStudent).delete(deleteStudent)
router.route('/:id/username').patch(updateUsername)
router.route('/:id/password').patch(updatePassword)
router.route('/:id/premium').patch(buyPremium)

module.exports = router
