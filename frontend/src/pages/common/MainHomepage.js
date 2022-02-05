import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper } from "@mui/material";
import {Button} from "@mui/material"
import AdminImage from "./admin.png"
import InstructorImage from "./instructor.png"
import StudentImage from "./student.png"

import "./style.css"

function MainHomepage() {
  const navigate = useNavigate()

  const handleEntry = (type)=>{
    if(type==='admin' || type==='instructor' || type==='student')
    {
        navigate(`/${type}`)
    }
    else
    {
      alert("Invalid Login Credentials")
    }
  }
  return (
  <>
        <div className="header">
          <h1>Welcome to the Examination System</h1>
        </div>
    
        <div style={{display:'flex',justifyContent:'space-between' , marginTop:'10px', marginLeft:'30px' , marginRight:'30px'}}>
          <Paper sx={{ maxWidth: '320px', zIndex: 10, borderRadius: '25px', margin: '0, 20px' ,display:'flex',justifyContent:'center'}} elevation={3}>
              <Box gap={5} padding={3}  >
                  <img src={AdminImage} style={{ borderRadius: '25px', objectFit: 'cover' }} alt={"dsadsa"} height={180}
                      width={'100%'} />
                  <Box style={{display:'flex',justifyContent:'center' , marginTop:'10px'}}>
                      <Button variant="contained" onClick={()=>handleEntry('admin')}>Admin Login</Button>
                  </Box>
              </Box>
          </Paper>
          <Paper sx={{ maxWidth: '320px', zIndex: 10, borderRadius: '25px', margin: '0, 20px' }} elevation={3}>
              <Box gap={5} padding={3}  >
                  <img src={InstructorImage} style={{ borderRadius: '25px', objectFit: 'cover' }} alt={"dsadsa"} height={180}
                      width={'100%'} />
                  <Box style={{display:'flex',justifyContent:'center' , marginTop:'10px'}}>
                      <Button variant="contained" onClick={()=>handleEntry('instructor')}>Instructor Login</Button>
                  </Box>
              </Box>
          </Paper>
          <Paper sx={{ maxWidth: '320px', zIndex: 10, borderRadius: '25px', margin: '0, 20px' }} elevation={3}>
              <Box gap={5} padding={3}  >
                  <img src={StudentImage} style={{ borderRadius: '25px', objectFit: 'cover' }} alt={"dsadsa"} height={180}
                      width={'100%'} />
                  <Box style={{display:'flex',justifyContent:'center' , marginTop:'10px'}}>
                      <Button variant="contained" onClick={()=>handleEntry('student')}>Student Login</Button>
                  </Box>
              </Box>
          </Paper>
        </div>
    
  </>)
}

export default MainHomepage;
