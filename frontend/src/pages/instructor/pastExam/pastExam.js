import React from 'react'
import { useState } from 'react';
import {useLocation} from 'react-router-dom';
import { Link } from "react-router-dom";
import Navbar from "../../../components/instructor/PastExam/Navbar/Navbar"

function PastExam() {

    const {state} = useLocation();
    console.log("Received params ",state)
    const course = state.course
    
    let exam=course.Exams;
    let index=0;
    
    return (
        <>
            <Navbar/>
            <h1 align="center">{course.courseName}</h1>
            <br/>
            <h2> &nbsp;&nbsp;List of Past Exams:- </h2>
            <br/>
            {exam.map((exam,exam_index) => {
                let submission=exam.Submissions;
                return <>      
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <div class="card w-75 border-secondary mb-3">
                        <h5 class="card-header" align="center">{exam.examName}</h5>
                            <div class="card-body">
                                <h5 class="card-title">Exam Date to be here </h5>
                                <p class="card-text">Total marks={exam.examMarks} 
                                <br/> 
                                Total weightage={exam.weightage} <br/>
                                Instructions:- {exam.instructions} 
                                <br/>
                                <br/>
                                <p>
                                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    View Students
                                </button>
                                </p>
                                <div class="collapse" id="collapseExample">
                                <div class="card card-body">
                                    {submission.map((submission,submission_index) => {
                                        return <>      
                                        <ul>
                                            <li>
                                                {submission.studentEmail} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Marks Obtained: {submission.marksObtained}
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link >View Submission</Link>
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