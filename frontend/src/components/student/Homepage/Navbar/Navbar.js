import React from 'react';

function Navbar() {
  return(
    <> 
      <div>
        <nav  class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Home</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Profile</a>
        </li>
        <li>
          <a class="nav-link active" aria-current="page" href="#">Student List</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Instructor List</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Course List</a>
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

