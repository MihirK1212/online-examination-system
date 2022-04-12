import React from 'react';
// import viewStudents from '../../../../pages/admin/ViewStudents/ViewStudents'
import { useNavigate } from 'react-router-dom';

import { Button } from '@material-ui/core';

function Navbar() {
  const navigate = useNavigate()
  const goToViewStu = ()=>{
    navigate('/admin/viewStudents', {
      state : "",
    })
  }
  return(
    <> 
      <div>
        <nav  class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
    <Button onClick={()=>{navigate('/')}} style={{color:"white"}}>Home</Button>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <Button onClick={goToViewStu} style={{color:"white"}}>Student List</Button>
        </li>
        <li class="nav-item">
        <Button onClick={goToViewStu} style={{color:"white"}}>Instructor List</Button>
        </li>
        <li class="nav-item">
        <Button onClick={goToViewStu} style={{color:"white"}}>Course List</Button>
        </li>
        
        
      </ul>
      
    </div>
  </div>
</nav>
      </div>
      
       </>
  )
}

export default Navbar;

