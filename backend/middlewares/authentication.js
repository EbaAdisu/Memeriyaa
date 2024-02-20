const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../errors')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('Authorization header is required')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            id: payload.id,
            username: payload.username,
            name: payload.name,
            email: payload.email,
            role: payload.role,
        }
        next()
    } catch (error) {
        throw new UnauthorizedError('Invalid token')
    }
}

module.exports = auth
