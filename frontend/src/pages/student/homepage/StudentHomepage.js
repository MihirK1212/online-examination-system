import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Navbar from '../../../components/student/Homepage/Navbar/Navbar';
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

function StudentHomepage({courses}) {

  console.log(courses)

  const navigate = useNavigate()

  const goToCourse = (course) =>{
    
    console.log("going to course ",course)
    navigate('/student/CourseHomepage', {
      state : course,
    })
  }
  
  return (
    <>
      <Navbar/>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
      <h1> Welcome to Student, IITI </h1>
      </div>
      
      
        <div className='stud-home-main'>
                <div className='image'><img className='dp-img' src={ img }></img></div>
                <div className='stud-data'>
                    <h4 style={{marginTop: 3, marginBottom: 3}}>Name: { data.generalDetails.name }</h4>
                    <span>Phone Number: { data.generalDetails.phoneNumber }</span> <br></br>
                    <span>Date of Birth: { data.generalDetails.dateOfBirth }</span><br></br>
                    <span>Program: { data.generalDetails.programName }</span><br></br>
                </div>
            </div>
            <br></br>
            <br></br>
            <hr></hr>
            <center><h2>List of Courses Enrolled</h2></center>
            <br></br>
            <div className='courseList'>
      {courses.map((course,index)=>{
        return <>
          <div className="course-card" >
            <img src={ img_course } className="course-card-img-top"></img>
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

export default StudentHomepage;

