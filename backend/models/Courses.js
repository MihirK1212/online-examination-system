const mongoose = require('mongoose')
const examsSchema = require('./Exams.js')

const coursesSchema = mongoose.Schema({
    courseCode : String,
    year : Number,
    semester : String,
    announcements : [String],
    studentsList : [String],
    instructorsList : [String],
    Exams : [examsSchema],
})


var Courses = mongoose.model('Courses', coursesSchema);

module.exports = Courses