import React, { useEffect, useRef, useState } from 'react'
import {useDispatch , useSelector } from 'react-redux'

import { Grid } from '@material-ui/core'

import ExamQuestion from '../../../components/student/GiveExam/ExamQuestion/ExamQuestion'

import {setInitialResponses} from '../../../redux/actions/Responses'

import exam from './sample_exam'
import "./style.css"

function GiveExam() {

    const dispatch = useDispatch()
 
    let [chosenQnIndex,setChosenQnIndex] = useState(0)
    
    const Questions  = exam.Questions
    
    let responses = useSelector((state)=> state.responses)

    if(responses.length !== Questions.length)
    {
        dispatch(setInitialResponses(Questions))
    }

    const endTiming = exam.endTiming

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
                alert('End of Exam')
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
        },1000);

        return  () => {
            clearTimeout(timerID)
        }
    },[responses])

    console.log("Student responses ",responses)

    const statusToStyle = {
        'NotSeen' : 'not-seen-question',
        'NotAttempted' : 'not-attempted-question',
        'Attempted' : 'attempted-question'
    }

    return (
        <>
        {
            responses.length > 0 ?
                <div className='examDisplay'>
                    <h4>{timerHours} : {timerMinutes} : {timerSeconds}</h4>
                    <div className='currentQuestion'>
                        <ExamQuestion question={Questions[chosenQnIndex]} response={responses[chosenQnIndex]} chosenQnIndex={chosenQnIndex} setChosenQnIndex={setChosenQnIndex} ub={Questions.length-1} key={chosenQnIndex}/>
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
            </div> : ""
        }
           
        </>
      
  )
}

export default GiveExam