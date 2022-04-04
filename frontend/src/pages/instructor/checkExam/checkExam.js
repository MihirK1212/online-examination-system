import React from 'react'

import { Button} from "@material-ui/core";

import ExamQuestion from "../../../components/instructor/CheckExam/ExamQuestion/ExamQuestion"
import Navbar from "../../../components/instructor/CheckExam/Navbar/Navbar"
import {useDispatch} from 'react-redux'
import { useLocation } from 'react-router-dom';


import { saveCheckedResponses } from '../../../redux/actions/Instructor';


function CheckExam() {
    
    const {state} = useLocation()
    const dispatch = useDispatch()

    const course = state.course
    const exam = state.exam
    const submission = state.submission

    console.log("received params check exam ",course,exam,submission)

    const studentEmail = submission.studentEmail

    let responses = submission.responses

    const setMarks = (qnIndex,val)=>{
        responses.map((response,index)=>{
            if(index===qnIndex)
            {
                response.marksObtained = parseInt(val)
            }
            return response
        })
    }

    const handleSubmit = ()=>{
        const checkedData = {
            course:course,
            exam:exam,
            studentEmail:studentEmail,
            responses:responses
        }
        dispatch(saveCheckedResponses(checkedData))
    }
    
    return (
        <>
            <Navbar/>  
            <br></br>

            <div className='questionsHeading'>
                <h2>Questions</h2>
            </div>

            


            <div className='questionsContainer'>
                {
                    responses.map((response,index)=><ExamQuestion question={exam.Questions[index]} response={response} index={index} setMarks={setMarks} key={index}/>)
                }
            </div>

            <Button variant="contained" onClick={handleSubmit} style={{display:"block",marginLeft:"auto",marginRight:"auto",marginTop:20,marginBottom:20,maxWidth: '200px', maxHeight: '500px', minWidth: '200px', minHeight: '50px',backgroundColor: "#3da5e0",}}>Submit</Button>
        </>
    )
}

export default CheckExam