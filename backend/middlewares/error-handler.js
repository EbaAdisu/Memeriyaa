const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    // console.log('Headers', err)
    if (err.statusCode) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    if (err.code === 11000) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg: `Duplicate value entered for ${Object.keys(err.keyValue).join(
                ' '
            )}`,
        })
    }
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ err, msg: err.message })
}
module.exports = errorHandler
