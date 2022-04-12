import React from 'react';
import Navbar from '../../../components/student/Participants/Navbar/Navbar';
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

function Profile() {
    return (
        <>
            <Navbar/>
            <div className='main'>
                <div className='image'><img className='dp-img' src={ img }></img></div>
                <div className='data'>
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
                {data.registeredCourses.map((p) => {
                    return (<>                        
                            <div className="card" >
                                <img src={ img_course } className="card-img-top"></img>
                                <div className="card-body">
                                    <h5 className="card-title">{ p.courseCode }</h5>
                                    <p className="card-text">{p.semester} {p.year}</p>
                                </div>
                            </div>
                    </>)
                })}
            </div>
        </>
    )
}

export default Profile