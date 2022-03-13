import React from 'react';
import {Routes,Route} from "react-router-dom";

import InstructorHomepage from '../homepage/InstructorHomepage';
import CourseHomepage from '../homepage/CourseHomepage';

function Instructor() {
  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<InstructorHomepage/>}/>
            <Route path="/CourseHomepage/:index" element={<CourseHomepage/>}/>
            
        </Routes>
    </div>
  </>)
}

export default Instructor;
