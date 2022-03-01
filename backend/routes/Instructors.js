const express = require('express')
const router = express.Router()

const {getCourses,getExams,addExam,saveExam,evaluateExam,assignGrade} = require('../controllers/Instructors')

router.route('/getCourses').get(getCourses)

router.route('/exams').get(getExams).post(addExam).patch(saveExam)
router.route('/exams/evaluate').patch(evaluateExam)
router.route('/grade').patch(assignGrade)

module.exports = router



