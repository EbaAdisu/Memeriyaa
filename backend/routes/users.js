const express = require('express')
const router = express.Router()
const { getAllUsers, checkUserName } = require('../controllers/users')

router.route('/').get(getAllUsers)
router.route('/:username').get(checkUserName)

module.exports = router
