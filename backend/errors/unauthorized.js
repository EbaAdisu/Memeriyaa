const customError = require('./custom')
const { StatusCodes } = require('http-status-codes')

class UnauthorizedError extends customError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorizedError
