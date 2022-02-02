import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainHomepage() {
  const navigate = useNavigate()

  const type='student';
  const handleEntry = ()=>{
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
    <div>
        <h1>This is the main home page</h1>
        <button onClick={()=>{handleEntry()}}>Login</button>
    </div>
  </>)
}

export default MainHomepage;
