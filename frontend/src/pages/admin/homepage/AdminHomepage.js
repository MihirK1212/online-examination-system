import React from 'react';

import Navbar from '../../../components/admin/Navbar/Navbar';
import Footer from '../../../components/admin/Footer/Footer';
import StudentImage from "./student.png"
import InstructorImage from "./instructor.png"
import c from "./cp.jpg"
import { Box, Paper } from "@mui/material";
import {Button} from "@mui/material"
import "./style.css"

function AdminHomepage() {
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
                      <Button variant="contained" ><a href="/admin/addStudent" style={{ color:'white', textDecoration: 'none' }}>Add Students</a></Button>
                  </Box>
              </Box>
          </Paper>
          <Paper sx={{ maxWidth: '320px', zIndex: 10, borderRadius: '25px', margin: '0, 20px' }} elevation={3}>
              <Box gap={5} padding={3}  >
                  <img src={InstructorImage} style={{ borderRadius: '25px', objectFit: 'cover' }} alt={"dsadsa"} height={120} width={'100%'} />
                  <Box style={{display:'flex',justifyContent:'center' , marginTop:'10px'}}>
                      <Button variant="contained" >Add Instructors</Button>
                  </Box>
              </Box>
          </Paper>
          <Paper sx={{ maxWidth: '320px', zIndex: 10, borderRadius: '25px', margin: '0, 20px' }} elevation={3}>
              <Box gap={5} padding={3}  >
                  <img src={c} style={{ borderRadius: '25px', objectFit: 'cover' }} alt={"dsadsa"} height={120} width={'100%'} />
                  <Box style={{display:'flex',justifyContent:'center' , marginTop:'10px'}}>
                      <Button variant="contained" >Add Courses</Button>
                  </Box>
              </Box>
          </Paper>
        </div>
    <br/>
    <br/>
    <div class="card text-center">
        <div class="card-header"></div>
        <div class="card-body">
            <a href="/admin/addCourseInstance" class="btn btn-primary">Make Course Instance</a>
        </div>
        <div class="card-footer text-muted"></div>
    </div>
    <Footer/>
    </>
  )
}

export default AdminHomepage;
