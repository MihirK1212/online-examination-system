import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@material-ui/core';

import Navbar from '../../../components/instructor/Homepage/Navbar/Navbar';


function InstructorHomepage({courses}) {

  console.log(courses)

  const navigate = useNavigate()

  const goToCourse = (course) =>{
    
    console.log("going to course ",course)
    navigate('/instructor/CourseHomepage', {
      state : course,
    })
  }
  
  return (
    <>
      <Navbar/>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
      <h1> Welcome to Instructor, IITI </h1>
      </div>
      <div style={{display: 'flex',  justifyContent:'left', alignItems:'center', height: '10vh'}}>
      <h2> &nbsp;&nbsp;List of present courses:- </h2>
      </div>
      
      
      {courses.map((course,index)=>{
        return <>      
          <br/>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div class="card w-75 text-center border-secondary mb-3" >
              <div class="card-body">
              <Button onClick={()=>{goToCourse(course)}}>{course.courseName}</Button>
              </div>
            </div>
          </div>

        </>})}
        
    </>
  )
}

export default InstructorHomepage;

