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
                                    <div class="header__item"><a id="name" class="filter__link" href="#">Course Code</a></div>
                                    <div class="header__item"><a id="wins" class="filter__link filter__link--number" href="#">Name</a></div>
                                    <div class="header__item"><a id="draws" class="filter__link filter__link--number" href="#">Description</a></div>
                                </div>
                                {
                                    students.map((student,index) => {
                                        return (<>
                                        <div class="table-content">	
                                            <div class="table-row">		
                                                <div class="table-data">{student.courseCode}</div>
                                                <div class="table-data">{student.courseName}</div>
                                                <div class="table-data">{student.description}</div>                                            </div>
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