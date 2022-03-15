import React , {useState} from 'react'
import { Button, Card} from "@material-ui/core";
import {useDispatch} from 'react-redux'
import { TextField} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import './style.css'

import { saveQuestionResponse } from '../../../redux/actions/Responses';

function ExamQuestion({question,response,chosenQnIndex,setChosenQnIndex,ub}) {

    const dispatch = useDispatch()

    let [selectedOptions,setSelectedOptions] = useState(response.questionSelectedOptions)
    let [numericAnswer,setNumericAnswer] = useState(response.questionGivenAnswer)

    const isChosen = (index) => {
        return selectedOptions.includes(index)
    }
    
    const optionSelect = (index) => {
        let currSelected = selectedOptions
        if(currSelected.includes(index))
        {
            currSelected = currSelected.filter(ansInd => ansInd!==index)
        }
        else
        {
            currSelected.push(index)
            currSelected = currSelected.sort()
        }

        setSelectedOptions([...currSelected])
    }

    const saveQuestion = (action) => {

        let responseData = {}

        responseData.questionNumber = question.questionNumber
        responseData.questionGivenAnswer = numericAnswer
        responseData.questionSelectedOptions = selectedOptions
        
        if(numericAnswer==='' && selectedOptions.length===0)
        {
            responseData.status = 'NotAttempted'
        }
        else
        {
            responseData.status = 'Attempted'
        }

        console.log("saving question ",responseData)

        dispatch(saveQuestionResponse(responseData))


        if(action==='FORWARD')
        {
            setChosenQnIndex(chosenQnIndex+1)
        }
        if(action==='BACKWARD')
        {
            setChosenQnIndex(chosenQnIndex-1)
        }
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
                                            <FormControlLabel control={<Checkbox checked={isChosen(index)} onChange={()=>{optionSelect(index)}}/>} style={{marginLeft:20}}/>
                                                <TextField
                                                    id="filled-multiline-flexible"
                                                    variant={'filled'}
                                                    label="Option Text"
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
                            value = {numericAnswer}
                            variant="filled"
                            onChange = {e=>setNumericAnswer(e.target.value)}
                            />
                        </div>
                    }
                </Card>

                <div>
                        {
                            chosenQnIndex>0?<Button onClick={()=>{saveQuestion('BACKWARD')}}>Previous</Button>:null
                        }
                        {
                            chosenQnIndex<ub?<Button onClick={()=>{saveQuestion('FORWARD')}}>Next</Button>:null
                        }
                </div>
                </div>
        </>
    )
}

export default ExamQuestion