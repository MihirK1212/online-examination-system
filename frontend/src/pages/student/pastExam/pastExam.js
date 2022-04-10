import { Button } from '@material-ui/core';
import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import "../../instructor/CourseHomepage/style.css"
import Navbar from '../../../components/instructor/PastExam/Navbar/Navbar'
import InstructorImage from "../../common/student.png";

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
        if(ind===-1){return 0}
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
                <div class="card-category-5" style={{"marginTop":-2}}>
                        <ul class="all-pr-cards">
                            <li>
                                <div class="per-card-3">
                                    <div class="card-image" style={{"backgroundColor":'#5866e4'}}>
                                       <img src={InstructorImage}/>
                                        <span class="per-name">{exam.examName}</span>
                                    </div>

                                    <div class="card-content" >

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
                                        
                                        
                                        <div class="social-icons" style={{"display":'flex',"alignItems":'center', "justifyContent":'center' ,"backgroundColor":'#4253ed'}}>
                                            <h2>Marks Obtained = {findMarksObtained(exam)} / {exam.examMarks}    </h2>         
                                        </div>
                                    </div>                  
                                </div>
                            </li>
                        </ul>
                    </div>
                <br/>
                </>})}
        </>
    )
}

export default PastExam