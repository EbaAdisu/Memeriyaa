const express = require('express')
const router = express.Router()

const {
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
} = require('../controllers/students')

router.route('/')

module.exports = router
