const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    studentEmail : String,
    studentName : String,
    dateOfBirth : Date, 
    degree : String,
    programName : String,
    startDateOfProgram : Date,
    registeredCourses : [{
        courseCode : String,
        year : Number,    // 2020, 2021, 2022
        semester : String,
        AttemptNo : { type : Number, default: 1},
        grade : String
    }]
})




var Students = mongoose.model('Students', studentSchema);

module.exports = Students