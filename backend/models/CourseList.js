const mongoose = require('mongoose')

const courseListSchema = mongoose.Schema({
    courseCode : String,
    courseName : String,
    description: String
})



var CourseList = mongoose.model('CourseList', courseListSchema);

module.exports = CourseList