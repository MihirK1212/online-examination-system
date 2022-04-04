import axios from 'axios';

const adminsURL = "http://localhost:5000/admin"
const instructorsURL = "http://localhost:5000/instructor"
const studentsURL = "http://localhost:5000/student"

export const getAllStudents    = ()  => axios.get(`${adminsURL}/getStudents`,    { headers: { authorization: localStorage.getItem('admin_token') } })
export const getAllInstructors = ()  => axios.get(`${adminsURL}/getInstructors`, { headers: { authorization: localStorage.getItem('admin_token') } })
export const getCourseList     = ()  => axios.get(`${adminsURL}/getCourseList`,  { headers: { authorization: localStorage.getItem('admin_token') } })
export const getCoursesAdmin   = ()  => axios.get(`${adminsURL}/getCourses`,     { headers: { authorization: localStorage.getItem('admin_token') } })

export const addStudents       = (students)       => axios.post(`${adminsURL}/addStudents`      , students      , { headers: { authorization: localStorage.getItem('admin_token') } })
export const addInstructors    = (instructors)    => axios.post(`${adminsURL}/addInstructors`   , instructors   , { headers: { authorization: localStorage.getItem('admin_token') } })
export const addCourse         = (course)         => axios.post(`${adminsURL}/addCourse`        , course        , { headers: { authorization: localStorage.getItem('admin_token') } })
export const addCourseInstance = (courseInstance) => axios.post(`${adminsURL}/addCourseInstance`, courseInstance, { headers: { authorization: localStorage.getItem('admin_token') } })

export const getCoursesStudent = () => axios.get(`${studentsURL}/getCourses`,{ headers: { authorization: localStorage.getItem('student_token') } }) 
export const saveResponses = (responseData) => axios.patch(`${studentsURL}/exams`  , responseData, { headers: { authorization: localStorage.getItem('student_token') } })

export const getCoursesInstructor = () => axios.get(`${instructorsURL}/getCourses`,{ headers: { authorization: localStorage.getItem('instructor_token') } })
export const addExam = (examData) => axios.post(`${instructorsURL}/exams`,examData,{ headers: { authorization: localStorage.getItem('instructor_token')}})
export const saveExam = (examData) => axios.patch(`${instructorsURL}/exams`,examData,{ headers: { authorization: localStorage.getItem('instructor_token')}})
export const saveCheckedResponses = (checkedData) => axios.patch(`${instructorsURL}/exams/check`,checkedData,{ headers: { authorization: localStorage.getItem('instructor_token')}})