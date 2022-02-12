const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    courseCode : String,
    year : Number,
    semester : String
})




var Courses = mongoose.model('Courses', courseSchema);

module.exports = Courses