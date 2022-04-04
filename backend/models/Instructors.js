const mongoose = require('mongoose')

const instructorsSchema = mongoose.Schema({
    instructorEmail : 
    {
        type: String,
        unique : true
    },
    generalDetails : {
        name : String,
        dateOfBirth : Date,
        phoneNumber : Number
    },

    registeredCourses: [{
        courseCode : String,
        year : Number,    // 2020, 2021, 2022
        semester : String
    }]
})


var Instructors = mongoose.model('Instructors', instructorsSchema);

module.exports = Instructors