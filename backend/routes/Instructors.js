const express = require('express')
const router = express.Router()

const {getCourses,addExam,saveExam,evaluateExam,assignGrade,saveCheckedResponses,addAnnouncement , getInstructorProfile} = require('../controllers/Instructors')

router.route('/getCourses').get(getCourses)
router.route('/getProfile').get(getInstructorProfile)
router.route('/exams').post(addExam).patch(saveExam)
router.route('/exams/check').patch(saveCheckedResponses)
router.route('/exams/evaluate').patch(evaluateExam)
router.route('/grade').patch(assignGrade)
router.route('/addAnnouncement').post(addAnnouncement)

module.exports = router



