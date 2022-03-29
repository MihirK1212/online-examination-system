import React from 'react'

import { Button} from "@material-ui/core";

import ExamQuestion from "../../../components/instructor/CheckExam/ExamQuestion/ExamQuestion"
import Navbar from "../../../components/instructor/CheckExam/Navbar/Navbar"

import exam from './sample_exam'

// import "./style.css"

function AddExam() {
    
    const studentEmail = 'cse200001044@iiti.ac.in'

    
    let responses = ((exam.Submissions.find(submission=>submission.studentEmail===studentEmail)).responses)

    const setMarks = (qnIndex,val)=>{
        responses.map((response,index)=>{
            if(index===qnIndex)
            {
                response.marksObtained = parseInt(val)
            }
            return response
        })
    }

    const handleSubmit = ()=>{
        console.log("Checked Responses ",responses)
    }
    
    return (
        <>
            {/* <Navbar/>   */}

            <div className='questionsHeading'>
                <h2>Questions</h2>
            </div>

            


            <div className='questionsContainer'>
                {
                    responses.map((response,index)=><ExamQuestion question={exam.Questions[index]} response={response} index={index} setMarks={setMarks} key={index}/>)
                }
            </div>

            <Button variant="contained" onClick={handleSubmit} style={{display:"block",marginLeft:"auto",marginRight:"auto",marginTop:20,marginBottom:20,maxWidth: '200px', maxHeight: '500px', minWidth: '200px', minHeight: '50px',backgroundColor: "#3da5e0",}}>Submit</Button>
        </>
    )
}

export default AddExam