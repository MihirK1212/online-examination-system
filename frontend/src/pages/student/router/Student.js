import React from 'react';
import {Routes,Route} from "react-router-dom";

import StudentHomepage from '../homepage/StudentHomepage';
import GiveExam from '../giveExam/giveExam';

function Student() {
  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<StudentHomepage/>}/>
            <Route path="/giveExam" element={<GiveExam/>}/>
        </Routes>
    </div>
  </>)
}

export default Student;


