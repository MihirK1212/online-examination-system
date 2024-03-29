const express = require('express')
const router = express.Router()

const {getCourses,saveSubmissions ,getStudentProfile , getResponses} = require('../controllers/Students')

router.route('/getCourses').get(getCourses)
router.route('/exams').patch(saveSubmissions)
router.route('/getProfile').get(getStudentProfile)
router.route('/getResponses').post(getResponses)


module.exports = router