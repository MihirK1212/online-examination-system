const mongoose = require('mongoose')
const questionsSchema = require('./Questions.js')

const examsSchema = mongoose.Schema({
    examName : String,
    examMarks : Number,
    instructions: String,
    weightage : Number,
    startTimings : Date,
    endTimings : Date,
    Questions : [questionsSchema],
    Submissions : [{
        studentEmail : String,
        responses :[{
            questionID : String,
            status : String,
            response : String
        }],
        marksObtained : Number
    }]
})

module.exports = examsSchema