const mongoose = require('mongoose')

const courseListSchema = mongoose.Schema({
    courseCode : 
    {
        type : String,
        unique : true
    },
    courseName : String,
    description: String
})



var CourseList = mongoose.model('CourseList', courseListSchema);

module.exports = CourseList