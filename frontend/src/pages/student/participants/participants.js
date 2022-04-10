import React from 'react';
import {useLocation} from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/student/Homepage/Navbar/Navbar';
import './style.css';
import img from "./profileIMG2.jpg"
import list from './course'

function displayParticipants() {
    const {state} = useLocation();
    return (
        <>
            <Navbar/>
            {
                list.map((value) => {
                    return(<>
                        {/* <div>
                            {value}
                        </div> <br></br> */}
                        <div className="card w-75">
                            <div><img src={img}></img></div>
                            <div className="card-body">
                                <h5 className="card-title">{value.studentName}</h5>
                                <p className="card-text">{value.studentEmail}</p>
                            </div>
                        </div>
                    </>)
                })
            }
        </>
    )
}

export default displayParticipants;
