import { Button } from '@material-ui/core';
import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import Navbar from "../../../components/instructor/PastExam/Navbar/Navbar"

import { evaluateExam } from '../../../api';


function PastExam() {

    const navigate = useNavigate()

    const {state} = useLocation();
    console.log("Received params past exam",state)
    
    const course = state
    let exams = course.Exams;

    const valid = (startTiming,endTiming) => {
        startTiming = new Date(startTiming)
        endTiming = new Date(endTiming)
        const now = new Date().getTime()

        return (now-startTiming)>0 && (now-endTiming)>0
    }

    const evaluate = (exam)=>{
        evaluateExam({
            examDetails : exam,
            courseDetails : course
        })
    }

    exams = exams.filter((exam)=>valid(exam.startTiming,exam.endTiming))

    const goToCheck = (exam,submission)=>{
        navigate('/instructor/checkExam', {
            state : {
                course : course,
                exam : exam,
                submission : submission
            }
        })
    }
    
    return (
        <>
            <Navbar/>
            <h1 align="center">{course.courseName}</h1>
            <br/>
            <h2> &nbsp;&nbsp;List of Past Exams:- </h2>
            <br/>
            {exams.map((exam) => {
                let submissions=exam.Submissions;
                return <>      
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <div class="card w-75 border-secondary mb-3">
                        <h5 class="card-header" align="center">{exam.examName}</h5>
                            <div class="card-body">
                                <h5 className="card-title">Start : {(new Date(exam.startTiming)).toString()} </h5>
                                <h5 className="card-title">End : {(new Date(exam.endTiming)).toString()} </h5>
                                <p className="card-text">Total marks={exam.examMarks} 
                                    <br/> 
                                    Total weightage={exam.examWeightage} <br/>
                                    Instructions:- {exam.instructions}
                                    <p>
                                    <Button onClick={()=>{evaluate(exam)}}>Evaluate Exam</Button>
                                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={"#asd"} aria-expanded="false" aria-controls={"asd"}>
                                        View Students
                                    </button>
                                    </p>
                                    <div class="collapse" id={"asd"}>
                                        <div class="card card-body" id={"asd"}>
                                            {submissions.map((submission) => {
                                                return <>      
                                                <ul>
                                                    <li>
                                                        {submission.studentEmail} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Marks Obtained: {submission.marksObtained}
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={()=>{goToCheck(exam,submission)}}>View Submission</Button>
                                                    </li>
                                                </ul>
                                                </>})}
                                        </div>
                                    </div>
                                </p>
                                
                            </div>
                    </div>
                </div>
                <br/>
                </>})}
        </>
    )
}

export default PastExam