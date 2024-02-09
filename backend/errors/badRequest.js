const customError = require('./custom')
const { StatusCodes } = require('http-status-codes')

class BadRequestError extends customError {
    constructor(message) {
        super(message, StatusCodes.BAD_REQUEST)
    }
}

module.exports = BadRequestError
