import { Button } from '@material-ui/core';
import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import Navbar from "../../../components/instructor/PastExam/Navbar/Navbar"
import InstructorImage from "../../common/instructor.png";
import { evaluateExam } from '../../../api';

import "./style.css"


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
        alert("Exam Is Being Evaluated...")
        navigate('/instructor')
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
            {exams.map((exam,index) => {
                let submissions=exam.Submissions;
                return <>      

                    <div class="card-category-5" style={{"marginTop":-2,"display":'flex',"justifyContent":'center'}}>
                        <ul class="all-pr-cards">
                            <li>
                                <div class="per-card-3">
                                    <div class="card-image" style={{"backgroundColor":'#5866e4'}}>
                                       <img src={InstructorImage}/>
                                        <span class="per-name">{exam.examName}</span>
                                    </div>

                                    <div class="card-content">

                                        <div style={{display:'flex','justifyContent':'center','flexDirection':'column'}}>
                                            <div style={{display:'flex','justifyContent':'space-between'}}>
                                                <span><b>Start Time</b> :  {(new Date(exam.startTiming)).toString().substring(0,24)}</span>
                                                <span><b>End Time</b> :  {(new Date(exam.endTiming)).toString().substring(0,24)}</span>
                                            </div>
                                            <br></br>
                                            <p>
                                                The exam will be of {exam.examMarks} marks with 
                                                a total weightage of {exam.examWeightage}. 
                                                The instructions for the exam are as follows :-
                                                
                                                <ul className='ssfd' style={{"textAlign":'left'}}>
                                                {
                                                    exam.instructions.split('\n').map((i,index)=>
                                                        <>
                                                            <li>{index+1}) {i}</li>
                                                            <br></br>
                                                        </>)
                                                }
                                                </ul>
                                                
                                            </p>
                                        </div>
                                        
                                        
                                        <div class="social-icons" style={{"display":'flex',"justifyContent":'center',"backgroundColor":'#4253ed'}}>
                                            <Button  style={{"fontSize":25,"fontFamily":'sans-serif'}} onClick={()=>{evaluate(exam)}}>Evaluate Exam</Button>
                                        </div>
                                    </div>   
                                                   
                                </div>
                            </li>

                            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#${"exam"+index}`} aria-expanded="false" aria-controls={`${"exam"+index}`} style={{marginLeft:5}}>
                                View Students
                            </button>
                    
                        <div class="collapse" id={`${"exam"+index}`} style={{"width":'82%',"marginLeft":'0px','marginTop':10}}>
                            <div class="card-xyz card-body-xyz" id={`${"exam"+index}`}>
                            <h4 style={{"marginBottom":4}}>Student Submissions</h4>
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
                    
                            
                           
                        </ul>
                        
                           
                        
                    </div>
                <br/>
                </>
            })}
        </>
    )
}

export default PastExam