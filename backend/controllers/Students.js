const Students = require('../models/Students')
const Instructors = require('../models/Instructors')
const CourseList = require('../models/CourseList')
const Courses = require('../models/Courses')


const  getCourses = async(req,res) => {
    try {
        const studentEmail = req.emailID
        
        let courses = await Courses.find({})
        
        courses = courses.filter((course)=>{
            return (course.studentsList).includes(studentEmail)
        })

        return res.status(201).json({"studentCourses": courses })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  saveSubmissions = async(req,res) => {
    try {
        const studentEmail = req.emailID

        const courseDetails = req.body.courseDetails //{courseName:,year:,semester:}
        const responses = req.body.responses
        
        // const courses = await Courses.find({})

        // const courseIndex = courses.findIndex((course)=>
        // {
        //     course.courseName===courseDetails.courseName &&
        //     course.year===courseDetails.year &&
        //     course.semseter===courseDetails.semseter
        // })

        // const course = courses[courseIndex]

        const course = await Courses.find({courseCode:courseDetails.courseCode,year:courseDetails.year,semseter:courseDetails.semseter})
        
        const examInd = course.Exams.findIndex((exam)=>exam.examName===courseDetails.examName)

        let Submissions = course.Exams[examInd].Submissions

        const submissionsInd = Submissions.findIndex((submission)=>submission.studentEmail===studentEmail)

        if(submissionsInd>=0)
        {
            Submissions[submissionsInd].responses = responses
        }
        else
        {
            Submissions.push({studentEmail:studentEmail,responses:responses})
        }

        await Courses.updateOne({courseCode:courseDetails.courseCode,year:courseDetails.year,semseter:courseDetails.semseter},{'$set': { [`Exams.${examInd}.Submissions`] : Submissions}},{new:true})

        return res.status(201).json({"addedResponses": responses})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}


module.exports = {getCourses,saveSubmissions}