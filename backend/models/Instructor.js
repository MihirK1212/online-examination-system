const mongoose = require('mongoose')

const instructorSchema = mongoose.Schema({
    instructorEmail : String,
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


var Instructors = mongoose.model('Instructors', instructorSchema);

module.exports = Instructors