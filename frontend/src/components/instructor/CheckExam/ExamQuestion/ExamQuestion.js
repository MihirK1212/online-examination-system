import React , {useState} from 'react'
import { Button, Card} from "@material-ui/core";
import {useDispatch} from 'react-redux'
import { TextField} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import './style.css'


function ExamQuestion({question,response,index,setMarks}) {

    const isChosen = (index) => {
        return response.questionSelectedOptions.includes(index)
    }

    const [marksObtained,setMarksObtained] = useState(response.marksObtained)

    const giveMarks = (qnIndex,val)=>{
        if(val>question.questionMarks){return}
        setMarksObtained(val)
        setMarks(qnIndex,val)
    }

    return (
        <>
            <div className={"questionContainerCheck"}>
                <Card className={"questionCardCheck"} >

                    <div className={"questionHeaderCheck"}>

                        <h3>{question.questionNumber}</h3>

                        <div className='marks'>
                            <div className="marksInput">
                                <TextField
                                    id="standard-number"
                                    label="Received"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value = {marksObtained}
                                    variant="standard"
                                    disabled={question.questionType==='MCQ' || question.questionType==='Numerical'}
                                    onChange={(e)=>{giveMarks(index,e.target.value)}}
                                />
                            </div>
                            
                            <div className="totalMarks">
                                <TextField
                                    id="standard-number"
                                    label="Total"
                                    type="number"
                                    disabled
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={question.questionMarks}
                                    variant="standard"
                                />
                            </div>
                        </div>

                        

                    </div>

                    <div className="questionContentCheck">
                        <TextField
                            id="filled-multiline-flexible"
                            variant={'filled'}
                            label="Question Content"
                            multiline
                            fullWidth
                            minRows={4}
                            maxRows={5}
                            disabled
                            value = {question.questionContent}
                        />
                    </div>

                    {
                        question.questionType === "MCQ" ?
                        <>  
                            {
                                question.questionOptions.map((option,index)=>{
                                    return (
                                        <>
                                            <Card className="optionCardCheck" key={index}>
                                            <FormControlLabel control={<Checkbox checked={isChosen(index)}/>} style={{marginLeft:20}}/>
                                                <TextField
                                                    id="filled-multiline-flexible"
                                                    variant={'filled'}
                                                    label="Option Text"
                                                    className='optionTextCheck'
                                                    multiline
                                                    size='small'
                                                    minRows={1}
                                                    maxRows={4}
                                                    disabled
                                                    value = {question.questionOptions[index]}
                                                />
                                            </Card>
                                        </>
                                    )
                                })
                            }
                            
                        </>
                        
                        :
                        <>
                        {
                            question.questionType==='Numerical'?
                            <div className='numericAnswerCheck'>
                                <TextField
                                id="filled-number"
                                label="Numeric Answer"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value = {response.questionGivenAnswer}
                                disabled
                                />
                            </div>:
                            <div className='subjectiveAnswerCheck'>
                                <TextField
                                    id="filled-multiline-flexible"
                                    variant={'filled'}
                                    label="Subjective Answer"
                                    multiline
                                    fullWidth
                                    minRows={6}
                                    value = {response.questionGivenAnswer}
                                    disabled
                                />
                            </div>
                        }
                            
                        </>

                        
                    }
                </Card>
                </div>
        </>
    )
}

export default ExamQuestion