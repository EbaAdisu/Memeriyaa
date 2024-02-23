const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')

const getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.status(StatusCodes.OK).json(users)
}
const checkUserName = async (req, res) => {
    const { username } = req.params
    const user = await User.findOne({ username })
    if (user) {
        return res
            .status(StatusCodes.OK)
            .json({ success: false, message: 'Username Not Available' })
    }
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Username Available',
    })
}

module.exports = {
    getAllUsers,
    checkUserName,
}
