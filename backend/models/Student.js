const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
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


var Students = mongoose.model('Students', studentSchema);

module.exports = Students