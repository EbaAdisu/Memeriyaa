const customError = require('./custom')
const { StatusCodes } = require('http-status-codes')

class notFoundError extends customError {
    constructor(message) {
        super(message, StatusCodes.NOT_FOUND)
    }
}

module.exports = notFoundError
