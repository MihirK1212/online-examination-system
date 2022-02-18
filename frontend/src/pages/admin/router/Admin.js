import React from 'react';
import {Routes,Route} from "react-router-dom";

import AdminHomepage from '../homepage/AdminHomepage';
import AddCourseInstance from '../addCourseInstance/addCourseInstance';

function Admin() {
  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<AdminHomepage/>}/>
            <Route path="/addCourseInstance" element={<AddCourseInstance/>}/>
        </Routes>
    </div>
  </>
  )
}

export default Admin;
