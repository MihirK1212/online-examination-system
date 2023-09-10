import React from 'react';
import { Box, Paper } from "@mui/material";

import AdminImage from "./admin.png"
import InstructorImage from "./instructor.png"
import StudentImage from "./student.png"
import "./style.css"
import { Link } from 'react-router-dom';

function MainHomepage() {

    return (
    <>
    <nav  class="navbar navbar-expand-lg navbar-dark bg-primary" style={{"justifyContent":'center'}}>
        <h1>Welcome to the Examination System</h1>
    </nav>
    
        <div style={{display:'flex',justifyContent:'space-between' , marginTop:'10px', marginLeft:'30px' , marginRight:'30px'}}>
          
          <Paper sx={{ maxWidth: '320px', zIndex: 10, borderRadius: '25px', margin: '0, 20px' ,display:'flex',justifyContent:'center'}} elevation={3}>
              <Box gap={5} padding={3}  >
                  <img src={AdminImage} style={{ borderRadius: '25px', objectFit: 'cover' }} alt={"dsadsa"} height={180}
                      width={'100%'} />
                  <Box style={{display:'flex',justifyContent:'center' , marginTop:'10px'}}>
                    <Link to="/login/admin">Admin Login</Link>
                  </Box>
              </Box>
          </Paper>

          <Paper sx={{ maxWidth: '320px', zIndex: 10, borderRadius: '25px', margin: '0, 20px' }} elevation={3}>
              <Box gap={5} padding={3}  >
                  <img src={InstructorImage} style={{ borderRadius: '25px', objectFit: 'cover' }} alt={"dsadsa"} height={180}
                      width={'100%'} />
                  <Box style={{display:'flex',justifyContent:'center' , marginTop:'10px'}}>
                    <Link to="/login/instructor">Intructor Login</Link>
                  </Box>
              </Box>
          </Paper>
          <Paper sx={{ maxWidth: '320px', zIndex: 10, borderRadius: '25px', margin: '0, 20px' }} elevation={3}>
              <Box gap={5} padding={3}  >
                  <img src={StudentImage} style={{ borderRadius: '25px', objectFit: 'cover' }} alt={"dsadsa"} height={180}
                      width={'100%'} />
                  <Box style={{display:'flex',justifyContent:'center' , marginTop:'10px'}}>
                    <Link to="/login/student">Student Login</Link>
                  </Box>
              </Box>
          </Paper>
        </div>
    
  </>)
}

export default MainHomepage;