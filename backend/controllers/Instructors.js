const Students = require('../models/Students')
const Instructors = require('../models/Instructors')
const CourseList = require('../models/CourseList')
const Courses = require('../models/Courses')


const  getCourses = async(req,res) => {
    try {
        const getInstructorEmail = req.body.instructorEmail
        const findInstructor = await Instructors.findOne({instructorEmail:getInstructorEmail})
        const instructorCourses = findInstructor.registeredCourses
        return res.status(201).json({"instructorCourses": instructorCourses })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  addExam = async(req,res) => {
    try {
        const examToAdd = req.body.exam
        const addToCourse = req.body.courseCode
        const findCourse = await Courses.findOne({courseCode:courseCode})
        findCourse.Exams.push(exam)
        return res.status(201).json({"examToAdd": examToAdd})
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
        const evaCourse = req.body.courseCode
        const evaExam = req.body.examName
        const courseToEvaluate = await Courses.findOne({courseCode:evaCourse})
        let examNumber;
        for(let i=0; i<courseToEvaluate.Exams.length; i++)
        {
            if(courseToEvaluate.Exams[i].examName == evaExam)
            {
                examNumber = i;
                break;
            }
        }
        for(let i=0; i<courseToEvaluate.Exams[examNumber].Submissions.length; i++)
        {
            for(let j=0; j<courseToEvaluate.Exams[examNumber].Submissions[i].responses.length; j++)
            {
                if(courseToEvaluate.Exams[examNumber].Submissions[i].responses[j].status == "Answered")
                {
                    for(let k=0; k<courseToEvaluate.Exams[examNumber].Questions.length; k++)
                    {
                        if(courseToEvaluate.Exams[examNumber].Questions[k].questionNumber == courseToEvaluate.Exams[examNumber].Submissions[i].responses[j].questionNumber)
                        {
                            if(courseToEvaluate.Exams[examNumber].Questions[k].questionType != "Subjective")
                            {
                                if(courseToEvaluate.Exams[examNumber].Questions[k].questionType == "Numerical")
                                {
                                    if(courseToEvaluate.Exams[examNumber].Submissions[i].responses[j].questionGivenAnswer == courseToEvaluate.Exams[examNumber].Questions[k].questionAnswer)
                                    {
                                        courseToEvaluate.Exams[examNumber].Submissions[i].marksObtained = courseToEvaluate.Exams[examNumber].Submissions[i].marksObtained + courseToEvaluate.Exams[examNumber].Questions[k].questionMarks;
                                    }
                                }
                                else
                                {
                                    if(courseToEvaluate.Exams[examNumber].Submissions[i].responses[j].questionSelectedOptions.length == courseToEvaluate.Exams[examNumber].Questions[k].questionAnswerOptions.length)
                                    {
                                        courseToEvaluate.Exams[examNumber].Submissions[i].responses[j].questionSelectedOptions.sort();
                                        courseToEvaluate.Exams[examNumber].Questions[k].questionAnswerOptions.sort();
                                        let checkAnswer = 1;
                                        for(let i1=0; i1<courseToEvaluate.Exams[examNumber].Submissions[i].responses[j].questionSelectedOptions.length; i1++)
                                        {
                                            if(courseToEvaluate.Exams[examNumber].Submissions[i].responses[j].questionSelectedOptions[i1] != courseToEvaluate.Exams[examNumber].Questions[k].questionAnswerOptions[i1])
                                            {
                                                checkAnswer = 0;
                                                break;
                                            }
                                        }
                                        if(checkAnswer == 1)
                                        {
                                            courseToEvaluate.Exams[examNumber].Submissions[i].marksObtained = courseToEvaluate.Exams[examNumber].Submissions[i].marksObtained + courseToEvaluate.Exams[examNumber].Questions[k].questionMarks;
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    }
                }
            }
        }

        return res.status(201).json({"courseToEvaluate": courseToEvaluate})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  assignGrade = async(req,res) => {
    try {
        const courseAddTo = req.body.courseCode 
        const courseToAssign = await Courses.findOne({courseCode:courseAddTo})
        for (let i = 0; i < courseToAssign.studentsList.length; i++) 
        {
            for(let j =0; j<courseToAssign.studentsList[i].registeredCourses.length; j++)
            {
                if(courseToAssign.studentsList[i].registeredCourses[j].courseCode == courseAddTo)
                {
                    courseToAssign.studentsList[i].registeredCourses[j].grade = "0";
                    break;
                }
            }
        }
        for (i = 0; i < courseToAssign.Exams.length; i++) 
        {
            for(let j =0; j<courseToAssign.Exams[i].Submissions.length; j++)
            {
                for(let k =0; k<courseToAssign.Exams[i].Submissions[j].studentEmail.registeredCourses.length; k++)
                {
                    if(courseToAssign.Exams[i].Submissions[j].studentEmail.registeredCourses[k].courseCode == courseAddTo)
                    {
                        courseToAssign.Exams[i].Submissions[j].studentEmail.registeredCourses[k].grade = (Number(courseToAssign.Exams[i].Submissions[j].studentEmail.registeredCourses[k].grade)+courseToAssign.Exams[i].Submissions[j].marksObtained).toString();
                        break;
                    }
                }
            }
        }
        let maximumMarks = 0;
        for (let i = 0; i < courseToAssign.studentsList.length; i++) 
        {
            for(let j =0; j<courseToAssign.studentsList[i].registeredCourses.length; j++)
            {
                if(courseToAssign.studentsList[i].registeredCourses[j].courseCode == courseAddTo)
                {
                    maximumMarks = courseToAssign.studentsList[i].registeredCourses[j].grade.toString();
                    break;
                }
            }
        }
        for (let i = 0; i < courseToAssign.studentsList.length; i++) 
        {
            for(let j =0; j<courseToAssign.studentsList[i].registeredCourses.length; j++)
            {
                if(courseToAssign.studentsList[i].registeredCourses[j].courseCode == courseAddTo)
                {
                    courseToAssign.studentsList[i].registeredCourses[j].grade = ((Number(courseToAssign.studentsList[i].registeredCourses[j].grade)*10)/maximumMarks).toString();
                    if ((Number(courseToAssign.studentsList[i].registeredCourses[j].grade)*10)%maximumMarks != 0)
                    courseToAssign.studentsList[i].registeredCourses[j].grade = (Number(courseToAssign.studentsList[i].registeredCourses[j].grade)+1).toString();
                    if(courseToAssign.studentsList[i].registeredCourses[j].grade == "10")
                    courseToAssign.studentsList[i].registeredCourses[j].grade = "AA";
                    if(courseToAssign.studentsList[i].registeredCourses[j].grade == "9")
                    courseToAssign.studentsList[i].registeredCourses[j].grade = "AB";
                    if(courseToAssign.studentsList[i].registeredCourses[j].grade == "8")
                    courseToAssign.studentsList[i].registeredCourses[j].grade = "BB";
                    if(courseToAssign.studentsList[i].registeredCourses[j].grade == "7")
                    courseToAssign.studentsList[i].registeredCourses[j].grade = "BC";
                    if(courseToAssign.studentsList[i].registeredCourses[j].grade == "6")
                    courseToAssign.studentsList[i].registeredCourses[j].grade = "CC";
                    if(courseToAssign.studentsList[i].registeredCourses[j].grade == "5")
                    courseToAssign.studentsList[i].registeredCourses[j].grade = "CD";
                    if(courseToAssign.studentsList[i].registeredCourses[j].grade == "4")
                    courseToAssign.studentsList[i].registeredCourses[j].grade = "DD";
                    if(courseToAssign.studentsList[i].registeredCourses[j].grade == "3")
                    courseToAssign.studentsList[i].registeredCourses[j].grade = "DE";
                    if(courseToAssign.studentsList[i].registeredCourses[j].grade == "2")
                    courseToAssign.studentsList[i].registeredCourses[j].grade = "EE";
                    if(courseToAssign.studentsList[i].registeredCourses[j].grade == "1")
                    courseToAssign.studentsList[i].registeredCourses[j].grade = "EF";
                    if(courseToAssign.studentsList[i].registeredCourses[j].grade == "0")
                    courseToAssign.studentsList[i].registeredCourses[j].grade = "FF";
                    break;
                }
            }
        }
        return res.status(201).json({"courseToAssign": courseToAssign})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}


module.exports = {getCourses,addExam,saveExam,evaluateExam,assignGrade}