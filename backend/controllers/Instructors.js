const Students = require('../models/Students')
const Instructors = require('../models/Instructors')
const CourseList = require('../models/CourseList')
const Courses = require('../models/Courses')


const  getCourses = async(req,res) => {
    try {
        const instructorEmail = req.emailID
        console.log("get courses instructor ",instructorEmail)
        let courses = await Courses.find({})
        
        courses = courses.filter((course)=>{
            return (course.instructorsList).includes(instructorEmail)
        })

        console.log("final ",courses)

        return res.status(201).json({"instructorCourses": courses })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  getInstructorProfile = async(req,res) => {
    try {
        const instructorEmail = req.emailID
        
        let instructor = await Instructors.findOne({instructorEmail:instructorEmail})
        
        let profile = instructor.generalDetails

        console.log("returning instructor profile ",profile)

        
        return res.status(201).json({"profile": profile })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  addExam = async(req,res) => {
    try {
        const exam = req.body.exam
        const courseDetails = req.body.courseDetails

        const course = await Courses.findOne({courseCode:courseDetails.courseCode,year:courseDetails.year,semseter:courseDetails.semseter})
        
        let Exams = course.Exams
        Exams.push(exam)

        await Courses.updateOne({courseCode:courseDetails.courseCode,year:courseDetails.year,semseter:courseDetails.semseter},{'$set': { [`Exams`] : Exams}},{new:true})
        
        return res.status(201).json({"examAdded": exam})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const  saveExam = async(req,res) => {
    try {
        const saveExam = req.body.exam
        const courseDetails = req.body.courseDetails

        // console.log("save exam called ",courseDetails)


        const course = await Courses.findOne({courseCode:courseDetails.courseCode,year:courseDetails.year,semseter:courseDetails.semseter})
        
        let Exams = course.Exams
        console.log(saveExam._id)
        let ind  = Exams.findIndex((exam)=>((exam._id).toString())===((saveExam._id).toString()))
        console.log("index found ",ind)

        Exams[ind] = saveExam

        await Courses.updateOne({courseCode:courseDetails.courseCode,year:courseDetails.year,semseter:courseDetails.semseter},{'$set': { [`Exams`] : Exams}},{new:true})
        
        return res.status(201).json({"examSaved": saveExam})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const saveCheckedResponses = async (req,res)=>{
    try {
        const courseDetails = req.body.course
        const examDetails = req.body.exam
        const studentEmail = req.body.studentEmail
        const responses = req.body.responses

        const course = await Courses.findOne({courseCode:courseDetails.courseCode,year:courseDetails.year,semseter:courseDetails.semseter})
        
        let Exams = course.Exams
        let examInd  = Exams.findIndex((exam)=>((exam._id).toString())===((examDetails._id).toString()))
        
        let Submissions = Exams[examInd].Submissions
        let submissionInd = Submissions.findIndex((submission)=>submission.studentEmail===studentEmail)

        Submissions[submissionInd].responses = responses

        await Courses.updateOne({courseCode:courseDetails.courseCode,year:courseDetails.year,semseter:courseDetails.semseter},{'$set': { [`Exams.${examInd}.Submissions`] : Submissions}},{new:true})
        
        return res.status(201).json({"checkedSaved": responses})
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

const addAnnouncement = async (req,res)=>{
    try {
        const courseDetails = req.body.course
        const announcement = req.body.announcement

        const course = await Courses.findOne({courseCode:courseDetails.courseCode,year:courseDetails.year,semseter:courseDetails.semseter})
        
        let announcements = course.announcements
        announcements.push(announcement)

        await Courses.updateOne({courseCode:courseDetails.courseCode,year:courseDetails.year,semseter:courseDetails.semseter},{'$set': { [`announcements`] : announcements}},{new:true})
        
        return res.status(201).json({"added announcement": req.body })
    } catch (error) {
        console.log(error)
        return res.status(404).json({"message":error})
    }
}

function areEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }


const  evaluateExam = async(req,res) => {
    try {
        const courseDetails = req.body.courseDetails
        const examDetails = req.body.examDetails

        const course = await Courses.findOne({courseCode:courseDetails.courseCode,year:courseDetails.year,semseter:courseDetails.semseter})

        let examInd = course.Exams.findIndex((exam)=>((exam._id).toString())===((examDetails._id).toString()))

        const Questions = course.Exams[examInd].Questions

        let questionAnswer = {}
        let questionType = {}
        let questionMarks = {}

        for(let i=0;i<Questions.length;i++)
        {
            const questionNumber = Questions[i].questionNumber

            questionType[questionNumber] = Questions[i].questionType
            questionMarks[questionNumber] = Questions[i].questionMarks

            if(Questions[i].questionType==='MCQ'){questionAnswer[questionNumber]=Questions[i].questionAnswerOptions}
            else{questionAnswer[questionNumber]=Questions[i].questionAnswer}
        }

        let Submissions = course.Exams[examInd].Submissions

        let totalMarks = 0

        for(let i=0; i<Submissions.length; i++)
        {
            totalMarks = 0
            for(let j=0; j<Submissions[i].responses.length; j++)
            {
                let questionResponse = Submissions[i].responses[j]

                const questionNumber = questionResponse.questionNumber

                if(questionType[questionNumber]==='MCQ')
                {
                    if(areEqual(questionResponse.questionSelectedOptions,questionAnswer[questionNumber]))
                    {
                        console.log("Correct answer ",questionResponse.questionSelectedOptions,questionAnswer[questionNumber])
                        Submissions[i].responses[j].marksObtained = questionMarks[questionNumber]
                    }
                    else
                    {
                        console.log("Wrong answer ",questionResponse.questionSelectedOptions,questionAnswer[questionNumber])
                        Submissions[i].responses[j].marksObtained = 0
                    }
                }
                else if(questionType[questionNumber]==='Numerical')
                {
                    if((parseFloat(questionResponse.questionGivenAnswer))===(parseFloat(questionAnswer[questionNumber])))
                    {
                        Submissions[i].responses[j].marksObtained = questionMarks[questionNumber]
                    }
                    else
                    {
                        Submissions[i].responses[j].marksObtained = 0
                    }
                }

                totalMarks+=Submissions[i].responses[j].marksObtained
                console.log("Student email ",Submissions[i].studentEmail," marksObtained ",Submissions[i].responses[j].marksObtained)
            }

            Submissions[i].marksObtained = totalMarks
        }

        await Courses.updateOne({courseCode:courseDetails.courseCode,year:courseDetails.year,semseter:courseDetails.semseter},{'$set': { [`Exams.${examInd}.Submissions`] : Submissions}},{new:true})

        return res.status(201).json({"evaluatedSubmissions": Submissions})
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


module.exports = {getCourses,addExam,saveExam,saveCheckedResponses,evaluateExam,assignGrade,addAnnouncement,getInstructorProfile}