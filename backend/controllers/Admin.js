const Students = require('../models/Students')
const Instructors = require('../models/Instructors')
const CourseList = require('../models/CourseList')
const Courses = require('../models/Courses')
const Admins = require('../models/Admins')

const  getAllStudents = async(req,res) => {
    try {
        let xyz = "hello"
        return res.status(201).json({"data": xyz })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  getAllInstructors = async(req,res) => {
    try {
        let xyz = "hello"
        return res.status(201).json({"data": xyz })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  getCourseList = async(req,res) => {
    try {
        let xyz = "hello"
        return res.status(201).json({"data": xyz })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  getCourses = async(req,res) => {
    try {
        let xyz = "hello"
        return res.status(201).json({"data": xyz })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  addStudent = async(req,res) => {
    try {
        let xyz = "hello"
        return res.status(201).json({"data": xyz })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  addInstructor = async(req,res) => {
    try {
        let xyz = "hello"
        return res.status(201).json({"data": xyz })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  addCourse = async(req,res) => {
    try {
        let xyz = "hello"
        return res.status(201).json({"data": xyz })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  addCourseInstance = async(req,res) => {
    try {
        let xyz = "hello"
        return res.status(201).json({"data": xyz })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}


module.exports = {getAllStudents,getAllInstructors,getCourseList,getCourses,addStudent,addInstructor,addCourse,addCourseInstance}