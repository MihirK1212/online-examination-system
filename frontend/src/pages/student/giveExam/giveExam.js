import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import {useDispatch , useSelector } from 'react-redux'
import ExamQuestion from '../../../components/student/ExamQuestion/ExamQuestion'
import {setInitialResponses} from '../../../redux/actions/Responses'

import exam from './sample_exam'

import "./style.css"

function GiveExam() {

    const dispatch = useDispatch()

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

    console.log("responses ",responses)

    return (

        <>
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