import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";

import MainHomepage from './pages/common/MainHomepage';
import Admin from './pages/admin/router/Admin';
import Instructor from './pages/instructor/router/Instructor';
import Student from './pages/student/router/Student';

import { useSelector } from "react-redux";

function App() {

  let adminAuth = useSelector((state)=> state.adminAuth)
  let instructorAuth = useSelector((state)=> state.instructorAuth)
  let studentAuth = useSelector((state)=> state.studentAuth)

  console.log("adminAuth",adminAuth)
  console.log("instructorAuth",instructorAuth)
  console.log("studentAuth",studentAuth)

  return (
    <>
            {
                <div className="App">
                    <Router>
                        <Routes>
                            <Route exact path="/" element = {<MainHomepage/>}/>
                            <Route path="/admin/*" element={adminAuth.isAuthenticated?<Admin/>:<Navigate to="/"/>}/>
                            <Route path="/instructor/*" element={instructorAuth.isAuthenticated?<Instructor/>:<Navigate to="/"/>}/>
                            <Route path="/student/*" element={studentAuth.isAuthenticated?<Student/>:<Navigate to="/"/>}/>
                        </Routes>
                    </Router>
                </div>
            }
    </>
  );
}

export default App;
