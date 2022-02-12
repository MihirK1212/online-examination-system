const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    questionType : String,
    questionNo : Number,
    questionContent : String,
    questionOptions : [String],
    questionAnswer : [String]
})

module.exports = questionSchema