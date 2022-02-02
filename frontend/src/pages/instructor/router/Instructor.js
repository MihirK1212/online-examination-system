import React from 'react';
import {Routes,Route} from "react-router-dom";

import InstructorHomepage from '../homepage/InstructorHomepage';

function Instructor() {
  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<InstructorHomepage/>}/>
        </Routes>
    </div>
  </>)
}

export default Instructor;
