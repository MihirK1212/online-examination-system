import React from 'react';
import {Routes,Route} from "react-router-dom";

import InstructorHomepage from '../homepage/InstructorHomepage';
import CourseHomepage from '../courseHomepage/CourseHomepage';
import AddExam from "../addExam/AddExam"

function Instructor() {

  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<InstructorHomepage/>}/>
            <Route path="/CourseHomepage" element={<CourseHomepage/>}/>
            <Route path="/AddExam" element={<AddExam/>}/>
        </Routes>
    </div>
  </>)
}

export default Instructor;
