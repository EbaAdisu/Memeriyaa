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
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((val) => {
            let msg = val.message
            // enums
            if (val.properties && val.properties.type === 'enum') {
                const enumValues = val.properties.enumValues.join(', ')
                msg += `  Value must be one of the following: [${enumValues}]`
            }
            console.log(msg)
            return msg
        })
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: messages })
    }
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ err, msg: err.message })
}
module.exports = errorHandler
