import React , {useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/student/Participants/Navbar/Navbar';
import './style.css';
import img from "./profileIMG2.jpg"

import { getParticipants } from '../../../api';

function StudentParticipants() {
    const {state} = useLocation();

    const studentsList = state.course.studentsList
    const instructorsList = state.course.instructorsList

    const [participants,setParticipants] = useState([])

    useEffect(()=>{
        getParticipants({studentsList:studentsList,instructorsList:instructorsList}).then((response)=>{
            console.log("response ",response)
            setParticipants(response.data.participants)
        })
    },[studentsList,instructorsList])

    console.log("participants ",participants)

    return (
        <>
            <Navbar/>

            {
                participants.studentParticipants && participants.instructorParticipants?
                <>
                    <h3 style={{marginTop:10,marginLeft:150}}>Instructors</h3>

                    {
                        participants.instructorParticipants.map((p) => {
                            return(<>
                                <div className="list-card w-75">
                                    <div><img src={img} alt=""></img></div>
                                    <div className="card-body">
                                        <h5 className="card-title">{p.instructorName}</h5>
                                        <p className="card-text">{p.instructorEmail}</p>
                                    </div>
                                </div>
                            </>)
                        })
                    }

                    <br></br>
                    <br></br>

                    <h3 style={{marginTop:10,marginLeft:150}}>Students</h3>

                    {
                        participants.studentParticipants.map((p) => {
                            return(<>
                                <div className="list-card w-75">
                                    <div><img src={img} alt=""></img></div>
                                    <div className="card-body">
                                        <h5 className="card-title">{p.studentName}</h5>
                                        <p className="card-text">{p.studentEmail}</p>
                                    </div>
                                </div>
                            </>)
                        })
                    }
                    </> : ""
                

            }

            
        </>
    )
}

export default StudentParticipants;
