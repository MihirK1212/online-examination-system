import React  from 'react';

import { Box, Paper } from "@mui/material";
import {Button} from "@mui/material"
import { useNavigate} from 'react-router-dom';
import Navbar from "../../../components/admin/Homepage/Navbar/Navbar"
import AddCourse from '../AddCourse/AddCourse';

import StudentImage from "./student.png"
import InstructorImage from "./instructor.png"
import c from "./cp.jpg"

import "./style.css"

function AdminHomepage() {
    const navigate = useNavigate()
  return (
    <>
    <Navbar/>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
        <h1> Welcome to Admin, IITI </h1>
    </div>
    
    <br/>
      <div style={{display:'flex',justifyContent:'space-between' , marginTop:'10px', marginLeft:'30px' , marginRight:'30px'}}>
          <Paper sx={{ maxWidth: '320px', zIndex: 10, borderRadius: '25px', margin: '0, 20px' ,display:'flex',justifyContent:'center'}} elevation={3}>
              <Box gap={5} padding={3}  >
                  <img src={StudentImage} style={{ borderRadius: '25px', objectFit: 'cover' }} alt={"dsadsa"} height={120} width={'100%'} />
                  <Box style={{display:'flex',justifyContent:'center' , marginTop:'10px'}}>
                    <Button variant="contained" onClick={()=>{navigate("/admin/addStudents")}}>Add Students</Button>
                    {/* <Button variant="contained" ><a href="/admin/addStudents" style={{ color:'white', textDecoration: 'none' }}>Add Students</a></Button> */}
                  </Box>
              </Box>
          </Paper>
          <Paper sx={{ maxWidth: '320px', zIndex: 10, borderRadius: '25px', margin: '0, 20px' }} elevation={3}>
              <Box gap={5} padding={3}  >
                  <img src={InstructorImage} style={{ borderRadius: '25px', objectFit: 'cover' }} alt={"dsadsa"} height={120} width={'100%'} />
                  <Box style={{display:'flex',justifyContent:'center' , marginTop:'10px'}}>
                      <Button variant="contained" onClick={()=>{navigate("/admin/addInstructors")}} >Add Instructors</Button>
                    {/* <Button variant="contained" ><a href="/admin/addInstructors" style={{ color:'white', textDecoration: 'none' }}>Add Instructors</a></Button> */}
                  </Box>
              </Box>
          </Paper>
          <Paper sx={{ maxWidth: '320px', zIndex: 10, borderRadius: '25px', margin: '0, 20px' }} elevation={3}>
              <Box gap={5} padding={3}  >
                  <img src={c} style={{ borderRadius: '25px', objectFit: 'cover' }} alt={"dsadsa"} height={120} width={'100%'} />
                  <Box style={{display:'flex',justifyContent:'center' , marginTop:'10px'}}>
                      <AddCourse/>
                  </Box>
              </Box>
          </Paper>
        </div>
    <br/>
    <br/>
    <div className="card text-center">
        <div className="card-header"></div>
        <div className="card-body">
        <Button variant="contained" onClick={()=>{navigate('/admin/addCourseInstance')}} >Make Course Instance</Button>
        {/* <a href="/admin/addCourseInstance" className="btn btn-primary">Make Course Instance</a> */}
        </div>
        <div className="card-footer text-muted"></div>
    </div>
    </>
  )
}

export default AdminHomepage;
