import React from 'react';
import {Routes,Route} from "react-router-dom";
import InstructorHomepage from '../homepage/InstructorHomepage';
import CourseHomepage from '../homepage/CourseHomepage';
import AddExam from "../addExam/addExam"

function Instructor() {

  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<InstructorHomepage/>}/>
            <Route path="/CourseHomepage/:index" element={<CourseHomepage/>}/>
            
            <Route path="/addExam" element={<AddExam/>}/>
        </Routes>
    </div>
  </>)
}

export default Instructor;
