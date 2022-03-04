import React from 'react';
import {Routes,Route} from "react-router-dom";

import AdminHomepage from '../homepage/AdminHomepage';
import AddCourseInstance from '../addCourseInstance/addCourseInstance';
import AddStudent from '../addStudent/addStudent';

function Admin() {
  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<AdminHomepage/>}/>
            <Route path="/addStudent" element={<AddStudent/>}/>
            <Route path="/addCourseInstance" element={<AddCourseInstance/>}/>
        </Routes>
    </div>
  </>
  )
}

export default Admin;
