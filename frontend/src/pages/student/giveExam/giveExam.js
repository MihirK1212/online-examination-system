import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import ExamQuestion from '../../../components/student/ExamQuestion/ExamQuestion'

function GiveExam() {

    let [chosenQnInex,setChosenQnIndex] = useState(0)

    const Questions  = [
        {
            questionType : "MCQ",
            questionNumber : 1,
            questionContent : "MCQ Question 1",
            questionMarks : 3,
            questionOptions : ["Op 1","Op 2","Op 3"],
            questionAnswerOptions : [0,2],
            questionAnswer : "",
            _id : "q1"
        },
        {
            questionType : "Numerical",
            questionNumber : 2,
            questionContent : "Numerical Question 1",
            questionMarks : 4,
            questionOptions : [],
            questionAnswerOptions : [],
            questionAnswer : "22.37",
            _id : "q2"
        },
        {
            questionType : "MCQ",
            questionNumber : 3,
            questionContent : "MCQ Question 2",
            questionMarks : 2,
            questionOptions : ["Op 1","Op 2","Op 3","Op 4"],
            questionAnswerOptions : [1],
            questionAnswer : "",
            _id : "q3"
        },
        {
            questionType : "MCQ",
            questionNumber : 4,
            questionContent : "MCQ Question 3",
            questionMarks : 5,
            questionOptions : ["Op 1","Op 2","Op 3","Op 4","Op 5"],
            questionAnswerOptions : [0,2,3],
            questionAnswer : "",
            _id : "q4"
        }
    ]

    return (

        <>
            <ExamQuestion question={Questions[chosenQnInex]}/>

            {
                chosenQnInex>0?<Button onClick={()=>{setChosenQnIndex(chosenQnInex-1)}}>Previous</Button>:null
            }
            {
                chosenQnInex<(Questions.length-1)?<Button onClick={()=>{setChosenQnIndex(chosenQnInex+1)}}>Next</Button>:null
            }

        </>
      
  )
}

export default GiveExam