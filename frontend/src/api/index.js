import axios from 'axios';

var dev = process.env.REACT_APP_DEV
console.log(dev)
const allURLs = {
    baseURL : dev==='true' ? "http://localhost:5000" : "https://g6p16-online-examination.herokuapp.com",
    adminsURL: dev === 'true' ? "http://localhost:5000/admin" : "https://g6p16-online-examination.herokuapp.com/admin",
    instructorsURL : dev === 'true' ? "http://localhost:5000/instructor" : "https://g6p16-online-examination.herokuapp.com/instructor",
    studentsURL: dev === 'true' ? "http://localhost:5000/student" : "https://g6p16-online-examination.herokuapp.com/student",
}


const  {baseURL ,adminsURL , instructorsURL , studentsURL } = allURLs

export const getParticipants = (lists) => axios.post(`${baseURL}/getParticipants`,lists)

export const getAllStudents    = ()  => axios.get(`${adminsURL}/getStudents`,    { headers: { authorization: localStorage.getItem('admin_token') } })
export const getAllInstructors = ()  => axios.get(`${adminsURL}/getInstructors`, { headers: { authorization: localStorage.getItem('admin_token') } })
export const getCourseList     = ()  => axios.get(`${adminsURL}/getCourseList`,  { headers: { authorization: localStorage.getItem('admin_token') } })
export const getCoursesAdmin   = ()  => axios.get(`${adminsURL}/getCourses`,     { headers: { authorization: localStorage.getItem('admin_token') } })

export const addStudents       = (students)       => axios.post(`${adminsURL}/addStudents`      , students      , { headers: { authorization: localStorage.getItem('admin_token') } })
export const addInstructors    = (instructors)    => axios.post(`${adminsURL}/addInstructors`   , instructors   , { headers: { authorization: localStorage.getItem('admin_token') } })
export const addCourse         = (course)         => axios.post(`${adminsURL}/addCourse`        , course        , { headers: { authorization: localStorage.getItem('admin_token') } })
export const addCourseInstance = (courseInstance) => axios.post(`${adminsURL}/addCourseInstance`, courseInstance, { headers: { authorization: localStorage.getItem('admin_token') } })

export const getStudentProfile = () => axios.get(`${studentsURL}/getProfile`,{ headers: { authorization: localStorage.getItem('student_token') } }) 
export const getCoursesStudent = () => axios.get(`${studentsURL}/getCourses`,{ headers: { authorization: localStorage.getItem('student_token') } }) 
export const getResponses = (exam) => axios.post(`${studentsURL}/getResponses`,exam,{ headers: { authorization: localStorage.getItem('student_token') } })
export const saveResponses = (responseData) => axios.patch(`${studentsURL}/exams`  , responseData, { headers: { authorization: localStorage.getItem('student_token') } })

export const getCoursesInstructor = () => axios.get(`${instructorsURL}/getCourses`,{ headers: { authorization: localStorage.getItem('instructor_token') } })
export const getInstructorProfile = () => axios.get(`${instructorsURL}/getProfile`,{ headers: { authorization: localStorage.getItem('instructor_token') } }) 
export const addExam = (examData) => axios.post(`${instructorsURL}/exams`,examData,{ headers: { authorization: localStorage.getItem('instructor_token')}})
export const saveExam = (examData) => axios.patch(`${instructorsURL}/exams`,examData,{ headers: { authorization: localStorage.getItem('instructor_token')}})
export const saveCheckedResponses = (checkedData) => axios.patch(`${instructorsURL}/exams/check`,checkedData,{ headers: { authorization: localStorage.getItem('instructor_token')}})
export const addAnnouncement = (announcementData) => axios.post(`${instructorsURL}/addAnnouncement`,announcementData,{ headers: { authorization: localStorage.getItem('instructor_token')}})

export const evaluateExam = (evaluationData) => axios.patch(`${instructorsURL}/exams/evaluate`,evaluationData, { headers: { authorization: localStorage.getItem('instructor_token')}}) 