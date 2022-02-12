const mongoose = require('mongoose')
const questionSchema = require('./Question.js')

const examsSchema = mongoose.Schema({
    examName : String,
    examMarks : Number,
    instructions: String,
    weightage : Number,
    startTimings : Date,
    endTimings : Date,
    Questions : [questionSchema],
    Submissions : [{
        studentEmail : String,
        responses :[{
            questionID : String,
            status : String,
            response : String
        }]
    }]
})

module.exports = examsSchema