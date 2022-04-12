import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@material-ui/core';

import Navbar from '../../../components/instructor/Homepage/Navbar/Navbar';
import img from "./profile.png";
import img_course from "./course.jpg";
import "./style.css";

let data = {
  studentEmail: 'cse200001063@iiti.ac.in',
  generalDetails: {
      name: 'Priyansh Jaseja',
      dateOfBirth: '11/11/2001',
      phoneNumber: 9424664100,
      programName: 'B.Tech.',
      startDateOfProgram: '05/11/2021'
  },
  registeredCourses: [
      {
          courseCode: 'CS 202',
          year: 2022,
          semester: 'Spring',
          grade: 'Not Given'
      },
      {
          courseCode: 'CS 203',
          year: 2022,
          semester: 'Autumn',
          grade: 'AA'
      },
      {
          courseCode: 'CS 202',
          year: 2022,
          semester: 'Spring',
          grade: 'Not Given'
      },
      {
          courseCode: 'CS 202',
          year: 2022,
          semester: 'Spring',
          grade: 'Not Given'
      }
  ]
}


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
      {/* <Navbar/>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
      <h1> Welcome to Instructor, IITI </h1>
      </div>
      <div style={{display: 'flex',  justifyContent:'left', alignItems:'center', height: '10vh'}}>
      <h2> &nbsp;&nbsp;List of present courses:- </h2>
      </div> */}
      
      
      {/* {courses.map((course,index)=>{
        return <>      
          <br/>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div class="card w-75 text-center border-secondary mb-3" >
              <div class="card-body">
              <Button onClick={()=>{goToCourse(course)}}>{course.courseName}</Button>
              </div>
            </div>
          </div>

        </>})} */}

        <Navbar/>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
        <h1> Welcome to Instructor, IITI </h1>
        </div>
            <div className='course-main'>
                <div className='course-image'><img className='dp-img' src={ img } alt=""></img></div>
                <div className='course-data'>
                    <h4 style={{marginTop: 3, marginBottom: 3}}>Name: { data.generalDetails.name }</h4>
                    <span>Phone Number: { data.generalDetails.phoneNumber }</span> <br></br>
                    <span>Date of Birth: { data.generalDetails.dateOfBirth }</span><br></br>
                    <span>Program: { data.generalDetails.programName }</span><br></br>
                </div>
            </div>
            <br></br>
            <br></br>
            <hr></hr>
            <center><h2>List of Courses</h2></center>
            <br></br>
            <div className='courseList'>
                {courses.map((course,index)=>{
                  return <>
                    <div className="course-card" >
                      <img src={ img_course } className="card-img-top" alt=""></img>
                        <div className="course-card-body">
                            <h5 className="course-card-title" style={{marginLeft:20}}>{ course.courseCode }</h5>
                            <Button onClick={()=>{goToCourse(course)}}>{course.courseName}</Button>
                            <p className="course-card-text" style={{marginLeft:20}}>{course.semester} {course.year}</p>
                        </div>
                    </div>

                  </>})}
            </div>
    </>
  )
}

export default InstructorHomepage;

