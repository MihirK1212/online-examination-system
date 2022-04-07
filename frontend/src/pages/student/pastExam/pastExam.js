import { Button } from '@material-ui/core';
import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import Navbar from "../../../components/instructor/PastExam/Navbar/Navbar"

function PastExam() {

    const studentEmail = localStorage.getItem('studentEmail')

    const {state} = useLocation();
    console.log("Received params past exam",state)
    
    const course = state.course
    let exams = course.Exams;

    const valid = (startTiming,endTiming) => {
        startTiming = new Date(startTiming)
        endTiming = new Date(endTiming)
        const now = new Date().getTime()

        return (now-startTiming)>0 && (now-endTiming)>0
    }

    const findMarksObtained = (exam) => {
        const Submissions = exam.Submissions

        let ind = Submissions.findIndex((submission)=>submission.studentEmail === studentEmail)
        return Submissions[ind].marksObtained 
    }

   exams = exams.filter((exam)=>valid(exam.startTiming,exam.endTiming))

    return (
        <>
            <Navbar/>
            <h1 align="center">{course.courseName}</h1>
            <br/>
            <h2> &nbsp;&nbsp;List of Past Exams:- </h2>
            <br/>
            {exams.map((exam) => {
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
                                    Marks Obtained = {findMarksObtained(exam)}
                                    
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