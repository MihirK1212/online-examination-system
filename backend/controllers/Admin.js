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
        const courseDetails = await Courses.find({})
        return res.status(201).json({"courseDetails": courseDetails})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  addStudents = async(req,res) => {
    try {
        const newStudent = await Students.create(req.body)
        return res.status(201).json({"newStudent":newStudent})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  addInstructors = async(req,res) => {
    try {
        const newInstructor = await Instructors.create(req.body)
        return res.status(201).json({"newInstructor":newInstructor})
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
        const newCourseInstance = await Courses.create(req.body)
        return res.status(201).json({"newCourseInstance":newCourseInstance})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}


module.exports = {getAllStudents,getAllInstructors,getCourseList,getCourses,addStudents,addInstructors,addCourse,addCourseInstance}