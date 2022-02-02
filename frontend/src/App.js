import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import MainHomepage from './pages/common/MainHomepage';
import Admin from './pages/admin/router/Admin';
import Instructor from './pages/instructor/router/Instructor';
import Student from './pages/student/router/Student';

function App() {
  return (
    <>
            {
                <div className="App">
                    <Router>
                        <Routes>
                            <Route exact path="/" element = {<MainHomepage/>}/>
                            <Route path="/admin/*" element={<Admin/>}/>
                            <Route path="/instructor/*" element={<Instructor/>}/>
                            <Route path="/student/*" element={<Student/>}/>
                        </Routes>
                    </Router>
                </div>
            }
    </>
  );
}

export default App;
