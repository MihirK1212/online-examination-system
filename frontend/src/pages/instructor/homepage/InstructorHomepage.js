import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@material-ui/core';

import Navbar from '../../../components/instructor/Homepage/Navbar/Navbar';
import img from "./profile.png";
import img_course from "./course.jpg";
import "./style.css";

function InstructorHomepage({courses,profile}) {

  console.log(courses)

  const navigate = useNavigate()

  const goToCourse = (course) =>{
    
    console.log("going to course ",course)
    navigate('/instructor/CourseHomepage', {
      state : course,
    })
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
    <>
      <Navbar/>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
        <h1> Welcome to Instructor, IITI </h1>
        </div>
            <div className='course-main'>
                <div className='course-image'><img className='dp-img' src={ img } alt=""></img></div>
                <div className='course-data'>
                    <h4 style={{marginTop: 3, marginBottom: 3}}>Name: { profile.name }</h4>
                    <span>Phone Number: { profile.phoneNumber }</span> <br></br>
                    <span>Date of Birth: { profile.dateOfBirth }</span><br></br>
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
                    <div className="course-card">
                      <img src={ img_course } className="card-img-top" alt=""></img>
                        <div className="course-card-body" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <h5 className="course-card-title">{ course.courseCode }</h5>
                            <Button onClick={()=>{goToCourse(course)}}>{course.courseName}</Button>
                            <p className="course-card-text">{capitalizeFirstLetter(course.semester)} {course.year}</p>
                        </div>
                    </div>

                  </>})}
            </div>
    </>
  )
}

export default InstructorHomepage;

