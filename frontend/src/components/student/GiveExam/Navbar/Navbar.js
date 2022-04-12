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
    <Button onClick={()=>{navigate('/student')}} style={{color:"white"}}>Home</Button>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>
      </div>
      
       </>
  )
}

export default Navbar;

