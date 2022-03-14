const mongoose = require('mongoose')

const questionsSchema = mongoose.Schema({
    questionType : String,
    questionNumber : Number,
    questionContent : String,
    questionMarks : Number,
    questionOptions : [String],
    questionAnswerOptions : [Number],
    questionAnswer : String,
})

module.exports = questionsSchema