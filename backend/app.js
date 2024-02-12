require('express-async-errors')
require('dotenv').config()

const express = require('express')
const app = express()

const connectDb = require('./db/connect')

// Import Routers
const authRouter = require('./routes/auth')
const courseRouter = require('./routes/courses')

// Middlewares
const authMiddleware = require('./middlewares/authentication')
const errorHandler = require('./middlewares/error-handler')
const notFound = require('./middlewares/not-found')

// Packages
app.use(express.json())

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/courses', authMiddleware, courseRouter)

app.use(errorHandler)
app.use(notFound)

const port = process.env.PORT || 5000

app.listen(port, async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        console.log(`Server is running on port ${port}`)
    } catch (error) {
        console.log(error)
    }
})
