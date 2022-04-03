const Students = require('../models/Students')
const Instructors = require('../models/Instructors')
const CourseList = require('../models/CourseList')
const Courses = require('../models/Courses')


const  getCourses = async(req,res) => {
    try {
        const getStudentEmail = req.body.studentEmail
        const findStudent = await Students.findOne({studentEmail:getStudentEmail})
        const studentCourses = findStudent.registeredCourses
        return res.status(201).json({"studentCourses": studentCourses })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  saveSubmissions = async(req,res) => {
    try {
        const courseAddTo = req.body.courseCode
        const examAddTo = req.body.examName
        const submissionsToAdd = req.body.Submissions
        const findCourse = await Courses.findOne({courseCode:courseCode})
        let it = -1
        for (let i = 0; i < findCourse.Exams.length; i++) 
        {
            if (findCourse.Exams[i].examName == examAddTo)
            {
                it = i;
                break;
            }
        }
        findCourse.Exams[i].Submissions.push(submissionsToAdd)

        return res.status(201).json({"submissionsToAdd": submissionsToAdd})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}


module.exports = {getCourses,saveSubmissions}