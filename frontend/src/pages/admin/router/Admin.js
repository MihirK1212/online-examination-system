import React, { useEffect , useState} from 'react';
import {Routes,Route} from "react-router-dom";

import AdminHomepage from '../homepage/AdminHomepage';
import AddCourseInstance from '../addCourseInstance/addCourseInstance';
import AddStudents from '../AddStudents/AddStudents';
import AddInstructors from '../AddInstructors/AddInstructors';
import ViewStudents from '../ViewStudents/ViewStudents';

import { getAllStudents , getAllInstructors , getCourseList , getCoursesAdmin } from '../../../api';

function Admin() {

  const [instructors,setInstructors] = useState([])
  const [students,setStudents] = useState([])
  const [courseList,setCourseList] = useState([])
  const [courses,setCourses] = useState([])


  useEffect(()=>{
    getAllInstructors().then(response=>setInstructors(response.data.allInstructors))
    getAllStudents().then(response=>setStudents(response.data.allStudents))
    getCourseList().then(response=>setCourseList(response.data.fullCourseList))
    getCoursesAdmin().then(response=>setCourses(response.data.allCourses))
  },[])

  console.log(instructors,students,courseList,courses)


  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<AdminHomepage/>}/>
            <Route path="/addStudents" element={<AddStudents/>}/>
            <Route path="/addInstructors" element={<AddInstructors/>}/>
            <Route path="/addCourseInstance" element={<AddCourseInstance instructors={instructors}/>}/>
            <Route path="/viewStudents" element={<ViewStudents students={students}/>}/>
        </Routes>
    </div>
  </>
  )
}

export default Admin;
