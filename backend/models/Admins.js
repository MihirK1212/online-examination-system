const mongoose = require('mongoose')

const coursesSchema = mongoose.Schema({
    userName :  String,
    password : String,
    Exams : [examsSchema] 
})

const adminsSchema = mongoose.Schema({
    userName :  String,
    password : String,
    Students : [String]
})


Submissions = [
    {
        student1,
        responses : [response1,response2,response3,response4,response5]
    },
    {
        student2,
        responses : [response1,response2,response3,response4,response5]
    }
]