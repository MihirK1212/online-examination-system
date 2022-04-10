import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@material-ui/core';

import Navbar from '../../../components/instructor/profile/Navbar/Navbar';


function Profile() {

  
  return (
    <>
      <Navbar/>
      <h1>Profile</h1>
      Name: BC
      
    </>
  )
}

export default Profile;

