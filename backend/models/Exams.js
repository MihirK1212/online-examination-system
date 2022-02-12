const mongoose = require('mongoose')

const examsSchema = mongoose.Schema({
    examName : String,
    marks : Number,
})

module.exports = examsSchema