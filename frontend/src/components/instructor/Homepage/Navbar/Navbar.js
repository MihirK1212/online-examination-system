import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

function Navbar() {
  const navigate = useNavigate()
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
          <a class="nav-link active" aria-current="page" href="/instructor/profile">Profile</a>
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

