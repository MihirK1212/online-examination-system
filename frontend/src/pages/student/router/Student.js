import React , {useEffect,useState} from 'react';
import {Routes,Route} from "react-router-dom";

import StudentHomepage from '../homepage/StudentHomepage';
import GiveExam from '../giveExam/giveExam';
import CourseHomepage from '../../student/courseHomepage/CourseHomepage';
import PastExam from '../pastExam/pastExam';
import Participants from '../participants/studentParticipants';
import Profile from '../profile/profile';

import { getCoursesStudent , getStudentProfile } from '../../../api';

function Student() {

  const [courses,setCourses] = useState([])
  const [profile,setProfile] = useState({})

  useEffect(()=>{
    getCoursesStudent().then(response=>setCourses(response.data.studentCourses))
    getStudentProfile().then(response=>setProfile(response.data.profile))
  },[])
  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<StudentHomepage courses={courses} profile={profile}/>}/>
            <Route path="/giveExam" element={<GiveExam/>}/>
            <Route path="/courseHomepage" element={<CourseHomepage/>}/>
            <Route path="/pastExam" element={<PastExam/>}/>
            <Route path="/participants" element={<Participants/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
    </div>
  </>)
}

export default Student;


