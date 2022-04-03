const Students = require('../models/Students')
const Instructors = require('../models/Instructors')
const CourseList = require('../models/CourseList')
const Courses = require('../models/Courses')
const Admins = require('../models/Admins')

const  getAllStudents = async(req,res) => {
    try {
        const allStudents = await Students.find({})
        return res.status(201).json({"allStudents": allStudents})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  getAllInstructors = async(req,res) => {
    try {
        const allInstructors = await Instructors.find({})
        return res.status(201).json({"allInstructors": allInstructors})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  getCourseList = async(req,res) => {
    try {
        const fullCourseList = await CourseList.find({})
        return res.status(201).json({"fullCourseList": fullCourseList})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  getCourses = async(req,res) => {
    try {
        const allCourses = await Courses.find({})
        return res.status(201).json({"allCourses": allCourses})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  addStudents = async(req,res) => {
    try {
        const students = req.body
        students.forEach(async (student)=>{
            try {
                await Students.create(student)
            } catch (error) {
                return
            }
        })
        return res.status(201).json({"newStudents":students})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  addInstructors = async(req,res) => {
    try {
        const instructors = req.body
        instructors.forEach(async (instructor)=>{
            try {
                await Instructors.create(instructor) 
            } catch (error) {
                return
            }
        })
        return res.status(201).json({"newInstructors":instructors})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  addCourse = async(req,res) => {
    try {
        const newCourse = await CourseList.create(req.body)
        return res.status(201).json({"newCourse":newCourse})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  addCourseInstance = async(req,res) => {
    try {
        let courseInstance = req.body

        const courseCode = courseInstance.courseCode

        const course = await CourseList.findOne({courseCode:courseCode})

        if(!course)
        {
            return res.status(404).json({"message":"course does not exist"})
        }

        console.log(course)

        courseInstance.courseName = course.courseName

        console.log("Course Instance ",courseInstance)
        const newCourseInstance = await Courses.create(courseInstance)

        const instructorsList = courseInstance.instructorsList
        const studentsList = courseInstance.studentsList

        instructorsList.forEach(async (instructorEmail)=>{
            let instructor = await Instructors.findOne({instructorEmail:instructorEmail})
            if(!instructor){return}
            
            let registeredCourses = instructor.registeredCourses
            registeredCourses.push({courseCode:courseInstance.courseCode,year:courseInstance.year,semester:courseInstance.semester})
            await Instructors.updateOne({instructorEmail:instructorEmail},{'$set': { [`registeredCourses`] : registeredCourses}},{new:true})
        })

        studentsList.forEach(async (studentEmail)=>{
            let student = await Students.findOne({studentEmail:studentEmail})
            if(!student){return}

            let registeredCourses = student.registeredCourses
            registeredCourses.push({courseCode:courseInstance.courseCode,year:courseInstance.year,semester:courseInstance.semester,grade:''})
            await Students.updateOne({studentEmail:studentEmail},{'$set': { [`registeredCourses`] : registeredCourses}},{new:true})
        })

        return res.status(201).json({"newCourseInstance":newCourseInstance})

    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}


module.exports = {getAllStudents,getAllInstructors,getCourseList,getCourses,addStudents,addInstructors,addCourse,addCourseInstance}