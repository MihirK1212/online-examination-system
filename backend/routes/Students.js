const express = require('express')
const router = express.Router()

const {getCourses,saveSubmissions} = require('../controllers/Students')

router.route('/getCourses').get(getCourses)
router.route('/exams').patch(saveSubmissions)

module.exports = router