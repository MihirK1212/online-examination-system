import React from 'react'
import { useState} from 'react';
import { Button, Card} from "@material-ui/core";
import { TextField} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import './style.css'

function ExamQuestion({question}) {

    const isAnswer = (index) => {
        return question.questionAnswerOptions.includes(index)
    }
    

    return (
        <>
            <div className={"questionContainerStudent"}>
                <Card className={"questionCardStudent"} >

                    <div className={"questionHeaderStudent"}>

                        <h3>{question.questionNumber}</h3>
                        
                        <div className="marksInputStudent">
                            <TextField
                                id="standard-number"
                                label="Marks"
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

                    {/* <h3 style={{marginLeft:10,marginTop:10}}>{question.questionNumber}</h3>
                    
                
                    <div className="marksInputStudent">
                        <TextField
                            id="standard-number"
                            label="Marks"
                            type="number"
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={question.questionMarks}
                            variant="standard"
                        />
                    </div> */}

                    

                <div className="questionContentStudent">
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
                                            <Card className="optionCardStudent" key={index}>
                                            <FormControlLabel control={<Checkbox checked={isAnswer(index)}/>} style={{marginLeft:20}}/>
                                                <TextField
                                                    id="filled-multiline-flexible"
                                                    variant={'filled'}
                                                    label="Enter Option Text"
                                                    className='optionTextStudent'
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

                        <div className='numericAnswerStudent'>
                            <TextField
                            id="filled-number"
                            label="Answer"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value = {question.questionAnswer}
                            variant="filled"
                            disabled
                            />
                        </div>
                    }
                </Card>
                </div>
        </>
    )
}

export default ExamQuestion