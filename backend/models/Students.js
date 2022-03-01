const mongoose = require('mongoose')

const studentsSchema = mongoose.Schema({
    studentEmail : String,
    generalDetails : {
        name : String,
        dateOfBirth : Date,
        phoneNumber : Number,
        degree : String,
        programName : String,
        startDateOfProgram : Date,
    },
    registeredCourses : [{
        courseCode : String,
        year : Number,  
        semester : String,
        grade : String
    }]
})


var Students = mongoose.model('Students', studentsSchema);

module.exports = Students