const mongoose = require('mongoose')
const questionsSchema = require('./Questions.js')

const examsSchema = mongoose.Schema({
    examName : String,
    examMarks : Number,
    examWeightage : Number,
    instructions: String,
    startTiming : Date,
    endTiming : Date,
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