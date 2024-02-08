require('express-async-errors')
require('dotenv').config()

const express = require('express')
const app = express()

const connectDb = require('./db/connect')

// Import Routers
const authRouter = require('./routes/auth')

// Middlewares

const errorHandler = require('./middlewares/error-handler')

// Packages
app.use(express.json())

// Routes
app.use('/api/v1/auth', authRouter)

app.use(errorHandler)

app.listen(5000, async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        console.log('Server is running on port 5000')
    } catch (error) {
        console.log(error)
    }
})
