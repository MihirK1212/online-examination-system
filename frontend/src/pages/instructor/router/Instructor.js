import React , {useState,useEffect} from 'react';
import {Routes,Route} from "react-router-dom";

import InstructorHomepage from '../homepage/InstructorHomepage';
import CourseHomepage from '../CourseHomepage/CourseHomepage';
import AddExam from "../addExam/addExam"
import CheckExam from "../checkExam/checkExam"
import EditExam from '../editExam/editExam';

import { getCoursesInstructor } from '../../../api';


function Instructor() {

  const [courses,setCourses] = useState([])

  useEffect(()=>{
    getCoursesInstructor().then(response=>setCourses(response.data.instructorCourses))
  },[])

  console.log(courses)

  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<InstructorHomepage courses={courses}/>}/>
            <Route path="/courseHomepage" element={<CourseHomepage/>}/>
            <Route path="/addExam" element={<AddExam/>}/>
            <Route path="/checkExam" element={<CheckExam/>}/>
            <Route path="/editExam" element={<EditExam/>}/>
        </Routes>
    </div>
  </>)
}

export default Instructor;
