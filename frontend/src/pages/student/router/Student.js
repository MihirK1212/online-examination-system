import React from 'react';
import {Routes,Route} from "react-router-dom";

import StudentHomepage from '../homepage/StudentHomepage';

function Student() {
  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<StudentHomepage/>}/>
        </Routes>
    </div>
  </>)
}

export default Student;


