import React from 'react';
import {Routes,Route} from "react-router-dom";

import AdminHomepage from '../homepage/AdminHomepage';
import AddCourseInstance from '../addCourseInstance/addCourseInstance';
import AddStudents from '../AddStudents/AddStudents';
import AddInstructors from '../AddInstructors/AddInstructors';

function Admin() {
  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<AdminHomepage/>}/>
            <Route path="/addStudents" element={<AddStudents/>}/>
            <Route path="/addInstructors" element={<AddInstructors/>}/>
            <Route path="/addCourseInstance" element={<AddCourseInstance/>}/>
        </Routes>
    </div>
  </>
  )
}

export default Admin;
