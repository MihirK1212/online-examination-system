import React from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../../../components/instructor/CourseHomepage/Navbar/Navbar';

import { Link } from "react-router-dom";

import Courses from './sample_courses';

function CourseHomepage() {
  const { index }= useParams();
  
    let exam=Courses[index].Exams;
    let a=Courses[index].announcements;
    return(
        <> 
            <Navbar course = {Courses[index]}/>
            <br/>
            <h1 align="center">{Courses[index].courseName}</h1>
            <br/>
            <h2> &nbsp;&nbsp;List of Upcoming Exams:- </h2>
            <br/>
            {exam.map((exam,index) => {
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
                                </p>
                                <a href="#" class="btn btn-primary">View</a>
                            </div>
                    </div>
                </div>
                <br/>
                </>})}
            <h2> &nbsp;&nbsp;Announcements:- </h2>

            {a.map((a,index) => {
                return <>      
                <ul>
                    <li>
                        {a}
                    </li>
                </ul>
                </>})}

            <form>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>
            <div class="mb-3 w-75" >
                <input type="text" placeholder="Announce something to class..." class="form-control" id="exampleInputPassword1"/>
                <br/>
                <button type="submit" class="btn btn-primary">Add Announcements</button>
            </div>
            </div>
            
            </form>
    </>
  )
}

export default CourseHomepage;


