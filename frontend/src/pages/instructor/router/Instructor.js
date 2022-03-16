import React from 'react';
import {Routes,Route} from "react-router-dom";

import InstructorHomepage from '../Homepage/InstructorHomepage';
import CourseHomepage from '../CourseHomepage/CourseHomepage';
import AddExam from "../AddExam/AddExam"

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
