import React from 'react';
import Navbar from '../../../components/instructor/Homepage/Navbar/Navbar';
import Courses from "./sample_courses"
import { Link } from "react-router-dom";

function InstructorHomepage() {

  
  return (
    <>
      <Navbar/>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
      <h1> Welcome to Instructor, IITI </h1>
      </div>
      <div style={{display: 'flex',  justifyContent:'left', alignItems:'center', height: '10vh'}}>
      <h2> &nbsp;&nbsp;List of present courses:- </h2>
      </div>
      
      
      {Courses.map((Courses,index)=>{
        return <>      
          <br/>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div class="card w-75 text-center border-secondary mb-3" >
              <div class="card-body">
              <Link to={"/instructor/CourseHomepage/"+index} class="btn btn-primary">{Courses.courseName}</Link>
              </div>
            </div>
          </div>

        </>})}
        
    </>
  )
}

export default InstructorHomepage;

