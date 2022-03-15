import React from 'react'
import { useState } from 'react';
import "./style.css"
import { TextField} from "@material-ui/core";
import ExamQuestion from '../../../components/instructor/ExamQuestion/ExamQuestion';
import Navbar from "../../../components/instructor/Navbar/Navbar"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button} from "@material-ui/core";

function AddExam() {
    
    const [examData,setExamData] = useState({"examName":"","examMarks":0,"examWeightage":0,"instructions":"",
                                            "date": new Date(),"startTime":"","endTime":"",
                                            "Questions":[]})

    const [visible,setVisble] = useState(true)

    const handleAddQuestion = () => {
        const newQuestion = {"questionType":"MCQ","questionNumber":examData.Questions.length+1,"questionContent":"","questionMarks":"","questionOptions":[],"questionAnswerOptions":[],"questionAnswer":""}
        let questions = examData.Questions
        questions.push(newQuestion)
        setExamData({...examData,Questions:questions})
    }

    const handleDeleteQuestion = (qnIndex) => {
        let questions = examData.Questions
        questions = questions.filter((question,index)=>index!==qnIndex)
        setExamData({...examData,Questions:[...questions]})
    }

    const handleSubmit = ()=>{
        let postData = {}
        postData.examName = examData.examName
        postData.examMarks = examData.examMarks
        postData.examWeightage = examData.examWeightage
        postData.instructions = examData.instructions
        postData.startTiming = new Date(examData.date+" "+examData.startTime+':00')
        postData.endTiming = new Date(examData.date+" "+examData.endTime+':00')
        postData.Questions = examData.Questions
        postData.Submissions = []

        console.log("Post data",postData)
    }

    
    return (
        <>
            <Navbar/>  
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
        

            <Button variant="contained" onClick={handleSubmit} style={{display:"block",marginLeft:"auto",marginRight:"auto",marginTop:20,marginBottom:20,maxWidth: '200px', maxHeight: '500px', minWidth: '200px', minHeight: '50px',backgroundColor: "#3da5e0",}}>Submit</Button>
            
        </>
    )
}

export default AddExam