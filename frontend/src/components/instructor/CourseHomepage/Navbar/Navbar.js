import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar(course) {

  const navigate = useNavigate()

  console.log("navbar course ",course)

  const goToAdd = ()=>{
    navigate('/instructor/addExam', {
      state : course,
    })
  }

  return(
    <> 
      <div>
        <button onClick={goToAdd}>Add Exam</button>
        <nav  className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <a classNameName="navbar-brand" href="#">Home</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Add Exams/Assignments</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Past Exams</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Participants</a>
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

