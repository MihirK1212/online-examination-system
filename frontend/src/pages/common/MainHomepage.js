import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import GoogleLogin from 'react-google-login';

import { Box, Paper } from "@mui/material";

import AdminImage from "./admin.png"
import InstructorImage from "./instructor.png"
import StudentImage from "./student.png"

import { loginAdmin } from '../../redux/actions/adminAuth';
import {loginInstructor} from '../../redux/actions/instructorAuth'
import {loginStudent} from '../../redux/actions/studentAuth'

import "./style.css"

function MainHomepage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginURL = process.env.REACT_APP_DEV === 'true' ? "http://localhost:5000/auth/googlelogin" : "https://g6p16-online-examination.herokuapp.com/auth/googlelogin";
    
  const responseSuccessGoogle = (response,type) => {
        console.log("Google response",response)
        axios({
            method: "POST",
            url: loginURL,
            data: { tokenId: response.tokenId , type:type }
        }).then(response => {
            if (response.status === 200) {
                localStorage.setItem(`${type}_token`, response.data.token)
                if(type==='admin')
                {
                    // console.log("Logging in as admin ", response.data.admin.emailId)
                    dispatch(loginAdmin())
                }
                if(type==='instructor')
                {
                    // console.log("Logging in as instructor ", response.data.instructor.emailId)
                    dispatch(loginInstructor())
                }
                if(type==='student')
                {
                    localStorage.setItem('studentEmail',response.data.student.emailID)
                    console.log("Logging in as student ", response.data.student.emailID)
                    dispatch(loginStudent())
                }
                navigate(`/${type}`)
            }
        }).catch(err=>{
            alert('Invalid Credentials')
        })
    }

    const responseErrorGoogle = (response) => {
        console.log("Google response",response)
    }

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
                        <GoogleLogin
                            clientId="630790416751-g3tk05k5j2kmgtqkl151o7rch4ol441r.apps.googleusercontent.com"
                            buttonText="Admin Login"
                            onSuccess={(response)=>{responseSuccessGoogle(response,'admin')}}
                            onFailure={responseErrorGoogle}
                            cookiePolicy={'single_host_origin'}
                        ></GoogleLogin>
                  </Box>
              </Box>
          </Paper>

          <Paper sx={{ maxWidth: '320px', zIndex: 10, borderRadius: '25px', margin: '0, 20px' }} elevation={3}>
              <Box gap={5} padding={3}  >
                  <img src={InstructorImage} style={{ borderRadius: '25px', objectFit: 'cover' }} alt={"dsadsa"} height={180}
                      width={'100%'} />
                  <Box style={{display:'flex',justifyContent:'center' , marginTop:'10px'}}>
                        <GoogleLogin
                            clientId="630790416751-g3tk05k5j2kmgtqkl151o7rch4ol441r.apps.googleusercontent.com"
                            buttonText="Intructor Login"
                            onSuccess={(response)=>{responseSuccessGoogle(response,'instructor')}}
                            onFailure={responseErrorGoogle}
                            cookiePolicy={'single_host_origin'}
                        ></GoogleLogin>
                  </Box>
              </Box>
          </Paper>
          <Paper sx={{ maxWidth: '320px', zIndex: 10, borderRadius: '25px', margin: '0, 20px' }} elevation={3}>
              <Box gap={5} padding={3}  >
                  <img src={StudentImage} style={{ borderRadius: '25px', objectFit: 'cover' }} alt={"dsadsa"} height={180}
                      width={'100%'} />
                  <Box style={{display:'flex',justifyContent:'center' , marginTop:'10px'}}>
                        <GoogleLogin
                            clientId="630790416751-g3tk05k5j2kmgtqkl151o7rch4ol441r.apps.googleusercontent.com"
                            buttonText="Student Login"
                            onSuccess={(response)=>{responseSuccessGoogle(response,'student')}}
                            onFailure={responseErrorGoogle}
                            cookiePolicy={'single_host_origin'}
                        ></GoogleLogin>
                  </Box>
              </Box>
          </Paper>
        </div>
    
  </>)
}

export default MainHomepage;
