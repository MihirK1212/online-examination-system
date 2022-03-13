import React from 'react'
import { useState} from 'react';
import { Button, Card} from "@material-ui/core";
import { FormControl, InputLabel,Select,MenuItem } from "@material-ui/core";
import { TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import "./style.css"
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function ExamQuestion({question,qnIndex,handleDeleteQuestion,examData,setExamData}) {

    const [formQuestion,setFormQuestion] = useState(question)
    const [editing,setEditing] = useState(false)

    const saveQuestion = ()=> {
        
        setEditing(!editing)

        let questions = examData.Questions
        
        questions[qnIndex] = formQuestion
        setExamData({...examData,Questions:[...questions]})
    }

    const handleTypeChange = (e) => {
        setFormQuestion({...formQuestion,questionType:e.target.value})
    }

    const addOption = () => {
        let origOptions  = formQuestion.questionOptions
        setFormQuestion({...formQuestion,questionOptions:[...origOptions,""]})
    }

    const removeOption = (index) =>{
        let options = formQuestion.questionOptions
        options.splice(index,1)
        setFormQuestion({...formQuestion,questionOptions:[...options]})

        let answerOptions = formQuestion.questionAnswerOptions
        answerOptions = answerOptions.filter(ansInd => ansInd!==index)
        answerOptions = answerOptions.map(ansInd => ansInd>index ? ansInd-1 : ansInd)
        setFormQuestion({...formQuestion,questionAnswerOptions:[...answerOptions]})
    }

    const isAnswer = (index) => {
        let answerOptions = formQuestion.questionAnswerOptions
        return answerOptions.includes(index)
    }

    const includeOption = (index) => {
        let answerOptions = formQuestion.questionAnswerOptions
        if(answerOptions.includes(index))
        {
            answerOptions = answerOptions.filter(ansInd => ansInd!==index)
        }
        else
        {
            answerOptions.push(index)
            answerOptions = answerOptions.sort()
        }
        setFormQuestion({...formQuestion,questionAnswerOptions:[...answerOptions]})
    }

    const changeOptionText = (e,index) => {
        let options  = formQuestion.questionOptions
        options[index] = e.target.value
        return options
    }

    return (
        <>
            <div className={"questionContainer"}>

                    <Card className={"questionCard"} >

                        <h3 style={{marginLeft:10,marginTop:10}}>{qnIndex+1}</h3>
                        
                        <div className='questionHeader'>
                            
                            <div className = "buttons">
                                {
                                    editing?
                                    <Button variant="contained" className="saveBtn" onClick={()=>{saveQuestion()}}>
                                        SAVE
                                    </Button>:
                                    <Button variant="contained" className="editBtn" onClick={()=>{setEditing(!editing)}}>
                                        EDIT
                                    </Button>
                                }
                            </div>
                            <DeleteIcon style={{marginLeft:50,marginTop:20,cursor:"default",display:"inline"}} onClick={()=>{handleDeleteQuestion(qnIndex)}}></DeleteIcon>
                        </div>
                            
                        <div className={"questionType"}>
                            <FormControl fullWidth disabled={!editing}>
                                <InputLabel variant={'standard'}>Choose Question Type</InputLabel>
                                <Select
                                    value={formQuestion.questionType}
                                    label="Theme"
                                    onChange={handleTypeChange}
                                    variant={'standard'}>
                                    <MenuItem value={'MCQ'}>Multiple Choice Question</MenuItem>
                                    <MenuItem value={'Numerical'}>Numerical Question</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        
                        <div className="marksInput">
                            <TextField
                                id="standard-number"
                                label="Marks"
                                type="number"
                                disabled={!editing}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value = {formQuestion.questionMarks}
                                variant="standard"
                                onChange={(e)=>{setFormQuestion({...formQuestion,questionMarks:e.target.value})}}
                            />
                        </div>

                        

                       <div className="questionContent">
                            <TextField
                                id="filled-multiline-flexible"
                                variant={'filled'}
                                label="Question Content"
                                multiline
                                fullWidth
                                minRows={4}
                                maxRows={5}
                                disabled={!editing}
                                value = {formQuestion.questionContent}
                                onChange={e=>setFormQuestion({...formQuestion,questionContent:e.target.value})}
                            />
                        </div>

                        {
                            formQuestion.questionType === "MCQ" ?
                            <>
                                <div className="addOptionButton" onClick={addOption} style={{visibility:editing?"":"hidden"}}>
                                    <span>Add Option</span> <AddIcon/>
                                </div>

                                {
                                    formQuestion.questionOptions.map((option,index)=>{
                                        return (
                                            <>
                                                <Card className="optionCard" key={index}>
                                                <FormControlLabel control={<Checkbox checked={isAnswer(index)} onChange={()=>{includeOption(index)}}/>} style={{marginLeft:20}}/>
                                                    <TextField
                                                        id="filled-multiline-flexible"
                                                        variant={'filled'}
                                                        label="Enter Option Text"
                                                        className='optionText'
                                                        multiline
                                                        size='small'
                                                        minRows={1}
                                                        maxRows={4}
                                                        disabled={!editing}
                                                        value = {formQuestion.questionOptions[index]}
                                                        onChange={e=>setFormQuestion({...formQuestion,questionOptions : changeOptionText(e,index)})}
                                                    />
                                                    <CloseIcon onClick={()=>{removeOption(index)}} style={{marginLeft:20 ,visibility:editing?"":"hidden"}} />
                                                </Card>
                                            </>
                                        )
                                    })
                                }
                                
                            </>
                            
                            :

                            <div className='numericAnswer'>
                                <TextField
                                id="filled-number"
                                label="Answer"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value = {formQuestion.questionAnswer}
                                onChange = {e=>setFormQuestion({...formQuestion,questionAnswer:e.target.value})}
                                variant="filled"
                                disabled={!editing}
                                />
                            </div>
                        }
                    </Card>
                </div>
           
        </>
    )
}

export default ExamQuestion