import React from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

import Navbar from '../../../components/instructor/CourseHomepage/Navbar/Navbar';

function CourseHomepage() {
    const {state} = useLocation();
    const navigate = useNavigate()

    console.log("Received params ",state)

    const valid = (startTiming,endTiming)=>{
        startTiming = new Date(startTiming)
        endTiming = new Date(endTiming)
        const now = new Date().getTime()

        return (startTiming-now)>0 && (endTiming-now)>0
    }

    const goToExam = (exam) =>{
    
        console.log("going to exam ",exam)
        navigate('/instructor/editExam', {
          state : {
              exam : exam,
              course : state
            }
        })
      }
    
    let exams = state.Exams;
    let announcements = state.announcements;
    return(
        <> 
            <Navbar course = {state}/>
            <br/>
            <h1 align="center">{state.courseName}</h1>
            <br/>
            <h2> &nbsp;&nbsp;List of Upcoming Exams:- </h2>
            <br/>
            {exams.map((exam,index) => {
                return <>    
                {
                    valid(exam.startTiming,exam.endTiming)?

                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <div className="card w-75 border-secondary mb-3">
                            <h5 className="card-header" align="center">{exam.examName}</h5>
                                <div className="card-body">
                                    <h5 className="card-title">Start : {(new Date(exam.startTiming)).toString()} </h5>
                                    <h5 className="card-title">End : {(new Date(exam.endTiming)).toString()} </h5>
                                    <p className="card-text">Total marks={exam.examMarks} 
                                    <br/> 
                                    Total weightage={exam.examWeightage} <br/>
                                    Instructions:- {exam.instructions}
                                    </p>
                                    <Button onClick={()=>{goToExam(exam)}}>Edit</Button>
                                </div>
                        </div>
                    </div> : ""
                }   
                <br/>
                </>})}
            <h2> &nbsp;&nbsp;Announcements:- </h2>

            {announcements.map((announcement,index) => {
                return <>      
                <ul>
                    <li>
                        {announcement}
                    </li>
                </ul>
                </>})}

            <form>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>
            <div className="mb-3 w-75" >
                <input type="text" placeholder="Announce something to class..." className="form-control" id="exampleInputPassword1"/>
                <br/>
                <button type="submit" className="btn btn-primary">Add Announcements</button>
            </div>
            </div>
            
            </form>
    </>
  )
}

export default CourseHomepage;


