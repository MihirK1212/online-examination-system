import React from 'react'
import { Button, TextField} from "@material-ui/core";
import dayjs from "dayjs"

import { useState } from 'react';
import "./styles.css"

function AddExam() {
    const [formData,setFormData] = useState({"examName":"","marks":0,"weightage":0,"instructions":"",
                                            "date": new Date(),"startTime":"","endTime":""
                                            })

    const handleSubmit = ()=>{
        // console.log("Submitting form",formData)

        let postData = {}
        postData.examName = formData.examName
        postData.marks = formData.marks
        postData.weightage = formData.weightage
        postData.instructions = formData.instructions
        postData.startTiming = dayjs(formData.date+'T'+formData.startTime+':00').format('YYYY-MM-DDTHH:mm:ss')
        postData.endTiming = dayjs(formData.date+'T'+formData.endTime+':00').format('YYYY-MM-DDTHH:mm:ss')  

    


        // let timing = Date(postData.endTiming)
        // let timingDate = timing.date

        console.log("Post data",postData)
        // console.log("Timing is ",timing)
        // console.log("date is ",(timingDate).toString())
    }
    return (
        <>
            <div className="formContainer">
                <form>
                    <h2>General Exam Details</h2>
                    <TextField
                        variant={'standard'}
                        fullWidth
                        label={"Exam Name"}
                        value={formData.examName}
                        onChange={e=>setFormData({...formData,examName:e.target.value})}
                    />
                    <br/><br/>

                    <TextField
                        variant={'standard'}
                        fullWidth
                        label={"Total Marks"}
                        type = "number"
                        value={formData.marks}
                        onChange={e=>setFormData({...formData,marks:e.target.value})}
                    />
                    <br/><br/>

                    <TextField
                        variant={'standard'}
                        fullWidth
                        label={"Weightage"}
                        type = "number"
                        value={formData.weightage}
                        onChange={e=>setFormData({...formData,weightage:e.target.value})}
                    />
                    <br/><br/>

                    <div className="date-time">
                        <h4>Choose Date and Time</h4>
                        <br/>

                        <span>Start Time</span> <input type={"time"} onChange={e=>setFormData({...formData,startTime:e.target.value})} value={formData.startTime}/>
                        <br/><br/>

                        <span>End Time</span> <input type={"time"} onChange={e=>setFormData({...formData,endTime:e.target.value})} value={formData.endTime}/>
                        <br/>

                        <br/><br/>

                        <span>Date</span><input type="date" value={formData.date} onChange={e=>setFormData({...formData,date:e.target.value})}/>
                    </div>
                    <br/><br/>

                    <TextField
                            id="filled-multiline-flexible"
                            variant={'filled'}
                            label="Instructions"
                            multiline
                            fullWidth
                            maxRows={4}
                            value = {formData.instructions}
                            onChange={e=>setFormData({...formData,instructions:e.target.value})}
                    />

                    <br/><br/>
                   
                   <Button onClick={handleSubmit}>Proceed to Add Questions</Button>
                    
                </form>
            </div>
        </>
    )
}

export default AddExam