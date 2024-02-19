const mongoose = require('mongoose')

const connectDb = async (uri) => {
    return (
        mongoose.connect(uri),
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        }
    )
}

module.exports = connectDb
