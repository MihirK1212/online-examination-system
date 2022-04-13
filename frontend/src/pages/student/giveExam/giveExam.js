import React, { useEffect, useRef, useState } from 'react'
import {useDispatch , useSelector } from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom';
import { Grid } from '@material-ui/core'

import ExamQuestion from '../../../components/student/GiveExam/ExamQuestion/ExamQuestion'
import Navbar from '../../../components/student/GiveExam/Navbar/Navbar';

import {setInitialResponses} from '../../../redux/actions/Responses'

import { saveResponses } from '../../../redux/actions/Responses';

import "./style.css"

function GiveExam() {

    const {state} = useLocation();
    const navigate = useNavigate()

    console.log("Received params in give exam ",state)
    
    const exam = state.exam
    const course = state.course

    const dispatch = useDispatch()
 
    let [chosenQnIndex,setChosenQnIndex] = useState(0)
    
    const Questions  = exam.Questions
    
    let responses = useSelector((state)=> state.responses)

    if(responses.length!==Questions.length)
    {
        dispatch(setInitialResponses(exam))
    }

    const endTiming = new Date(exam.endTiming)

    const [timerHours,setTimerHours] = useState('00')
    const [timerMinutes,setTimerMinutes] = useState('00')
    const [timerSeconds,setTimerSeconds] = useState('00')


    let interval = useRef()
    
    const startTimer = () => {
        interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = endTiming - now

            const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60))
            const minutes = Math.floor((distance%(1000*60*60))/(1000*60))
            const seconds = Math.floor((distance%(1000*60))/1000)

            if(distance<0){
                window.location = "/student"
                clearInterval(interval.current)
            }

            else{
                setTimerHours(hours)
                setTimerMinutes(minutes)
                setTimerSeconds(seconds)
            }


        }, 1000);
    };

    useEffect(()=>{
        startTimer();
        return ()=>{
            clearInterval(interval.current)
        }
    });

  
    useEffect(()=>{
        const timerID = setTimeout(()=>{
            console.log("saving responses ",responses)
            let courseDetails = course
            courseDetails.exam_id = exam._id

            dispatch(saveResponses({courseDetails:courseDetails,responses:responses}))
        },1000);

        return  () => {
            clearTimeout(timerID)
        }
    },[responses])

    const submitResponses = () => {
        let courseDetails = course
        courseDetails.exam_id = exam._id
        dispatch(saveResponses({courseDetails:courseDetails,responses:responses}))
        navigate('/student')
    }

    console.log("Student responses ",responses)

    const statusToStyle = {
        'NotSeen' : 'not-seen-question',
        'NotAttempted' : 'not-attempted-question',
        'Attempted' : 'attempted-question'
    }

    return (
        <>
        <Navbar/>
        {
            responses.length > 0 ?
            <>
                <section className="countdown-container">
                    <div className="countdown">
                        <article>
                        <p>{timerHours}</p>
                        <h3>Hours</h3>
                        </article>
                        <article>
                        <p>{timerMinutes}</p>
                        <h3>Minutes</h3>
                        </article>
                        <article>
                        <p>{timerSeconds}</p>
                        <h3>Seconds</h3>
                        </article>
                    </div>
                </section>
                
                <div className='examDisplay'>
                    {/* <h4>{timerHours} : {timerMinutes} : {timerSeconds}</h4> */}
                        <div className='currentQuestion'>
                            <ExamQuestion question={Questions[chosenQnIndex]} response={responses[chosenQnIndex]} chosenQnIndex={chosenQnIndex} setChosenQnIndex={setChosenQnIndex} ub={Questions.length-1} submitResponses={submitResponses} key={chosenQnIndex}/>
                        </div>

                    <div className='responsesStatus'>

                        <h4>Responses</h4>

                        <Grid container columns={{ xs: 2, sm: 2, md: 2 }}>
                            {
                                responses.map(question => 
                                <Grid item xs={3} sm={3} md={3} key={question.questionNumber}>
                                    <div className={statusToStyle[question.status]}>
                                        {question.questionNumber}
                                    </div>
                                        
                                </Grid>)
                            }
                        </Grid>
                        
                    </div>
                </div> 
            </>: ""
        }
           
        </>
      
  )
}

export default GiveExam