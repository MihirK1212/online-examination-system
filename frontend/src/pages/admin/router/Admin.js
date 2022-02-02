import React from 'react';
import {Routes,Route} from "react-router-dom";

import AdminHomepage from '../homepage/AdminHomepage';

function Admin() {
  return (
  <>
    <div>
        <Routes>
            <Route path="/" element={<AdminHomepage/>}/>
        </Routes>
    </div>
  </>
  )
}

export default Admin;
