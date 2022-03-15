const Students = require('../models/Students')
const Instructors = require('../models/Instructors')
const CourseList = require('../models/CourseList')
const Courses = require('../models/Courses')


const  getCourses = async(req,res) => {
    try {
        let xyz = "hello"
        return res.status(201).json({"data": xyz })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  addExam = async(req,res) => {
    try {
        let xyz = "hello"
        return res.status(201).json({"data": xyz })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  saveExam = async(req,res) => {
    try {
        let xyz = "hello"
        return res.status(201).json({"data": xyz })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  evaluateExam = async(req,res) => {
    try {
        let xyz = "hello"
        return res.status(201).json({"data": xyz })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  assignGrade = async(req,res) => {
    try {
        let xyz = "hello"
        return res.status(201).json({"data": xyz })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}


module.exports = {getCourses,getExams,addExam,saveExam,evaluateExam,assignGrade}