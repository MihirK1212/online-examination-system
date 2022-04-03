import React from 'react'
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';

import { TextField} from "@material-ui/core";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button} from "@material-ui/core";

import ExamQuestion from '../../../components/instructor/AddExam/ExamQuestion/ExamQuestion'
import Navbar from "../../../components/instructor/AddExam/Navbar/Navbar"

import { saveExam } from '../../../redux/actions/Instructor';

import "./style.css"

function EditExam() {

    const dispatch = useDispatch()

    const {state} = useLocation();
    console.log("Received params ",state)
    const exam = state.exam
    const course = state.course

    exam.startTiming = exam.startTiming.toString()
    exam.endTiming = exam.startTiming.toString()

    const [examData,setExamData] = useState(exam)

    examData.date = (new Date(exam.startTiming)).toISOString().split('T')[0]
    examData.startTime = (new Date(exam.startTiming)).toISOString().split('T')[1]
    examData.endTime = (new Date(exam.endTiming)).toTimeString().split(' ')[1]

    console.log("examData in edit ",examData)

    const [visible,setVisble] = useState(true)

    const handleAddQuestion = () => {
        const questions = examData.Questions
        const newQnNum = (Date.now()).toString()

        const newQuestion = {"questionType":"MCQ","questionNumber":newQnNum,"questionContent":"","questionMarks":"","questionOptions":[],"questionAnswerOptions":[],"questionAnswer":""}
        
        setExamData({...examData,Questions:[...questions,newQuestion]})
    }

    const handleDeleteQuestion = (questionNumber) => {
        console.log("deleting ",questionNumber)
        setExamData({...examData,Questions:examData.Questions.filter((question)=>question.questionNumber!==questionNumber)})
    }

    const handleSave = ()=>{
        let postData = {}
        postData._id = examData._id
        postData.examName = examData.examName
        postData.examMarks = parseFloat(examData.examMarks)
        postData.examWeightage = parseFloat(examData.examWeightage)
        postData.instructions = examData.instructions
        postData.startTiming = new Date(examData.date+" "+examData.startTime+':00')
        postData.endTiming = new Date(examData.date+" "+examData.endTime+':00')

        let Questions = examData.Questions



        Questions.map((question,index)=>{
            question.questionNumber = index+1
            question.questionMarks = parseFloat(question.questionMarks)
            return question
        })

        postData.Questions = Questions
        postData.Submissions = []

        console.log("Saving Exam",postData)
        dispatch(saveExam({exam:postData,courseDetails:course}))
    }

    
    return (
        <>
            <Navbar/>  

            <h5>Course Name : {course.courseName}</h5>

            <div className='container'>
                <ArrowDropDownIcon style={{marginTop:20}} onClick={()=>{setVisble(!visible)}}></ArrowDropDownIcon>

                
                <div className="formContainer" style={{display:visible?"block":"none"}}>
                    <form>
                        <h2>General Exam Details</h2>
                        <hr/>
                        <TextField
                            variant={'standard'}
                            fullWidth
                            label={"Exam Name"}
                            value={examData.examName}
                            onChange={e=>setExamData({...examData,examName:e.target.value})}
                        />
                        <br/><br/>

                        <TextField
                            variant={'standard'}
                            fullWidth
                            label={"Total Marks"}
                            type = "number"
                            value={examData.examMarks}
                            onChange={e=>setExamData({...examData,examMarks:e.target.value})}
                        />
                        <br/><br/>

                        <TextField
                            variant={'standard'}
                            fullWidth
                            label={"Weightage"}
                            type = "number"
                            value={examData.examWeightage}
                            onChange={e=>setExamData({...examData,examWeightage:e.target.value})}
                        />
                        <br/><br/>

                        <div className="date-time">
                            <h4>Choose Date and Time</h4>
                            <br/>

                            <span>Start Time</span> <input type={"time"} onChange={e=>setExamData({...examData,startTime:e.target.value})} value={examData.startTime}/>
                            <br/><br/>

                            <span>End Time</span> <input type={"time"} onChange={e=>setExamData({...examData,endTime:e.target.value})} value={examData.endTime}/>
                            <br/>

                            <br/><br/>

                            <span>Date</span><input type="date" value={examData.date} onChange={e=>setExamData({...examData,date:e.target.value})}/>
                        </div>
                        <br/><br/>

                        <TextField
                                id="filled-multiline-flexible"
                                variant={'filled'}
                                label="Instructions"
                                multiline
                                fullWidth
                                minRows={3}
                                maxRows={4}
                                value = {examData.instructions}
                                onChange={e=>setExamData({...examData,instructions:e.target.value})}
                        />

                        <br/><br/>
                    </form>
                </div>
            </div>

            <br/>

            <div className='questionsHeading'>
                <h2>Questions</h2>
            </div>

            


            <div className='questionsContainer'>
                {
                    examData.Questions.map((question,index)=><ExamQuestion question={question} qnIndex = {index} handleDeleteQuestion={handleDeleteQuestion} examData={examData} setExamData={setExamData} key={question.questionNumber}/>)
                }
                <AddCircleIcon onClick={handleAddQuestion}></AddCircleIcon>
            </div>
        

            <Button variant="contained" onClick={handleSave} style={{display:"block",marginLeft:"auto",marginRight:"auto",marginTop:20,marginBottom:20,maxWidth: '200px', maxHeight: '500px', minWidth: '200px', minHeight: '50px',backgroundColor: "#3da5e0",}}>Save</Button>
            
        </>
    )
}

export default EditExam