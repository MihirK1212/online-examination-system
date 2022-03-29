import React from 'react';
import {Routes,Route} from "react-router-dom";

import InstructorHomepage from '../homepage/InstructorHomepage';
import CourseHomepage from '../CourseHomepage/CourseHomepage';
import AddExam from "../addExam/addExam"
import CheckExam from "../checkExam/checkExam"

function Instructor() {

  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<InstructorHomepage/>}/>
            <Route path="/courseHomepage" element={<CourseHomepage/>}/>
            <Route path="/addExam" element={<AddExam/>}/>
            <Route path="/checkExam" element={<CheckExam/>}/>
        </Routes>
    </div>
  </>)
}

export default Instructor;
