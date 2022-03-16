import React, { useState } from 'react'
import {useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { Grid } from '@material-ui/core'

import ExamQuestion from '../../../components/student/giveExam/ExamQuestion/ExamQuestion'

import {setInitialResponses} from '../../../redux/actions/Responses'

import exam from './sample_exam'
import "./style.css"

function GiveExam() {

    const dispatch = useDispatch()
    // const navigate = useNavigate()

    // const startTiming = exam.startTiming
    // const endTiming = exam.endTiming

    const [timeHours,setTimeHours] = useState(0)
    const [timeMinutes,setTimeMinutes] = useState(0)
    const [timeSeconds,setTimeSeconds] = useState(0)
    
    
    // setInterval(()=>{
    //     const currTiming = new Date()
    //     const diff = endTiming-currTiming

    //     if(diff<=0)
    //     {
    //         navigate('/')
    //     }

    //     const hours = Math.floor(diff/(1000*60*60))
    //     const minutes = Math.floor((diff%(1000*60*60))/(1000*60))
    //     const seconds = Math.floor((diff%(1000*60))/1000)

    //     setTimeHours(hours)
    //     setTimeMinutes(minutes)
    //     setTimeSeconds(seconds)

    // },1000)

    let [chosenQnIndex,setChosenQnIndex] = useState(0)
    const Questions  = exam.Questions

    let responses = useSelector((state)=> state.Responses)


    if(responses.length !== Questions.length)
    {
        dispatch(setInitialResponses(Questions))
    }

  
    const statusToStyle = {
        'NotSeen' : 'not-seen-question',
        'NotAttempted' : 'not-attempted-question',
        'Attempted' : 'attempted-question'
    }

    // console.log("responses ",responses)

    return (

        <>
        <h4>{timeHours} hours </h4>
        <h4>{timeMinutes} minutes </h4>
        <h4>{timeSeconds} seconds </h4>
        {
            responses.length > 0 ?
                <div className='examDisplay'>
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