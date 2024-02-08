const errorHandler = (err, req, res, next) => {
    // console.log('Headers', err)
    if (err.statusCode) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).json({ err, msg: err.message })
}
module.exports = errorHandler
