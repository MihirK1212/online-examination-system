import React from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import "../../instructor/CourseHomepage/style.css"
import Navbar from '../../../components/student/CourseHomepage/Navbar/Navbar'
import InstructorImage from "../../common/student.png";

function CourseHomepage() {
    const {state} = useLocation();
    const navigate = useNavigate()

    console.log("Received params ",state)

    const valid = (startTiming,endTiming)=>{
        startTiming = new Date(startTiming)
        endTiming = new Date(endTiming)
        const now = new Date()

        console.log(startTiming,endTiming,now)

        return (endTiming-now)>0
    }

    const isCurrent = (startTiming,endTiming)=>{
        startTiming = new Date(startTiming)
        endTiming = new Date(endTiming)
        const now = new Date().getTime()

        return (now-startTiming)>0 && (endTiming-now)>0
    }

    const goToExam = (exam) =>{
    
        console.log("going to exam ",exam)
        navigate('/student/giveExam', {
          state : {
              exam : exam,
              course : state
            }
        })
      }

    function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    let exams = state.Exams;
    let announcements = state.announcements;
    return(
        <> 
            <Navbar course = {state}/>
            <br/>
            <h1 align="center">{state.courseName}</h1>
            <br/>
            <h2 className='homepageHeading'> &nbsp;&nbsp;List of Upcoming Exams:- </h2>
            <br></br>
            <br></br>
            
            {exams.map((exam,index) => {
                return <>    
                {
                    valid(exam.startTiming,exam.endTiming)?

                    <div class="card-category-5" style={{"marginTop":-2}}>
                        <ul class="all-pr-cards">
                            <li>
                                <div class="per-card-3">
                                    <div class="card-image" style={{"backgroundColor":'#5866e4'}}>
                                       <img src={InstructorImage} alt=""/>
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
                                        {
                                            isCurrent(exam.startTiming,exam.endTiming)?
                                            <Button onClick={()=>{goToExam(exam)}}>Attempt</Button>:
                                            <h2>This exam is closed for now</h2>
                                        }                          
                                        </div>
                                    </div>                  
                                </div>
                            </li>
                        </ul>
                    </div>
                    : ""
                }   
                </>})}
                <br/>
            <div style={{marginLeft:50}}>
                <h2 className='homepageHeading'> &nbsp;&nbsp;Announcements:- </h2>

                <div style={{marginLeft:20}}>

                    {announcements.map((announcement,index) => {
                        return <>      
                        <ul>
                            <li>
                                {capitalizeFirstLetter(announcement)}
                            </li>
                        </ul>
                        </>})}
                </div>
            </div>
    </>
  )
}

export default CourseHomepage;


