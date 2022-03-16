import React from 'react';
import {Routes,Route} from "react-router-dom";


import AdminHomepage from '../Homepage/AdminHomepage';
import AddCourseInstance from '../AddCourseInstance/AddCourseInstance';
import AddStudents from '../AddStudents/AddStudents';

function Admin() {
  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<AdminHomepage/>}/>
            <Route path="/addStudents" element={<AddStudents/>}/>
            <Route path="/addCourseInstance" element={<AddCourseInstance/>}/>
        </Routes>
    </div>
  </>
  )
}

export default Admin;
