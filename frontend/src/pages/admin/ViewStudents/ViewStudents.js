import React from 'react';
// import {useLocation} from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/admin/General/Navbar/Navbar';

function ViewStudents({students}) {
    console.log("students ",students);
    // const navigate = useNavigate();
    return (
        <>
            <Navbar/>
            {
                students.map((student) => {
                    return(<>
                       <h5> {student.studentEmail}</h5>
                    </>)
                    })
            }
            
        </>
    )
}

export default ViewStudents;