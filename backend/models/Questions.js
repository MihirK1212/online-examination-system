const mongoose = require('mongoose')

const questionsSchema = mongoose.Schema({
    questionType : String,
    questionNo : Number,
    questionContent : String,
    questionOptions : [String],
    questionAnswer : [String]
})

module.exports = questionsSchema