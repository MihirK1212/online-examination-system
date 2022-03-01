const express = require('express')
const router = express.Router()

const {getAllStudents,getAllInstructors,getCourseList,getCourses,addStudent,addInstructor,addCourse,addCourseInstance} = require('../controllers/Admin')

router.route('/getStudents').get(getAllStudents)
router.route('/getInstructors').get(getAllInstructors)
router.route('/getCourseList').get(getCourseList)
router.route('/getCourses').get(getCourses)

router.route('/addStudent').post(addStudent)
router.route('/addInstructor').post(addInstructor)
router.route('/addCourse').post(addCourse)
router.route('/addCourseInstance').post(addCourseInstance)

module.exports = router
