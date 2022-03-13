const mongoose = require('mongoose')

const questionsSchema = mongoose.Schema({
    questionType : String,
    questionNumber : Number,
    questionContent : String,
    questionMarks : Number,
    questionOptions : [String],
    questionAnswer : String,
    questionAnswerOptions : [String],
})

module.exports = questionsSchema