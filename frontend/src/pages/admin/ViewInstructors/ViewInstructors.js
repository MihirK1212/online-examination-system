import React,{useState} from 'react';
// import {useLocation} from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/admin/General/Navbar/Navbar';

import './style.css'

function ViewStudents({students}) {
    console.log(students)
    // const sortName = ()=>{
    //     console.log("sorting by name")
    // }

    return (
        <>
            <Navbar/>
            <div class="container12345" style={{"width":'100%'}}>
                            
                            <div class="table" style={{"width":'100%'}}>
                                <div class="table-header">
                                    <div class="header__item"><a id="name" class="filter__link" href="#">Name</a></div>
                                    <div class="header__item"><a id="wins" class="filter__link filter__link--number" href="#">Email</a></div>
                                    <div class="header__item"><a id="draws" class="filter__link filter__link--number" href="#">Date of Birth</a></div>
                                    <div class="header__item"><a id="losses" class="filter__link filter__link--number" href="#">Phone Number</a></div>
                                </div>
                                {
                                    students.map((student,index) => {
                                        return (<>
                                        <div class="table-content">	
                                            <div class="table-row">		
                                                <div class="table-data">{student.generalDetails.name}</div>
                                                <div class="table-data">{student.instructorEmail}</div>
                                                <div class="table-data">{student.generalDetails.dateOfBirth.substr(0,10)}</div>
                                                <div class="table-data">{student.generalDetails.phoneNumber}</div>
                                            </div>
                                        </div>
                                        </>	)
                                    })
                                }
                            </div>
                        </div>
            
        </>
    )
}

export default ViewStudents;