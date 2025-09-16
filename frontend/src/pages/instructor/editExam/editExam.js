import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
    TextField,
    Button,
    Container,
    Typography,
    Paper,
    Box,
    Grid,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExamQuestion from '../../../components/instructor/AddExam/ExamQuestion/ExamQuestion';
import Navbar from '../../../components/instructor/AddExam/Navbar/Navbar';
import { saveExam } from '../../../redux/actions/Instructor';

// Helper to format date and time
const toLocalISOString = (date) => {
    const d = new Date(date);
    const pad = (num) => (num < 10 ? '0' : '') + num;
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const toTimeString = (date) => {
    const d = new Date(date);
    const pad = (num) => (num < 10 ? '0' : '') + num;
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};


function EditExam() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { exam, course } = state;

    const [examData, setExamData] = useState({
        ...exam,
        date: toLocalISOString(exam.startTiming),
        startTime: toTimeString(exam.startTiming),
        endTime: toTimeString(exam.endTiming),
    });

    const handleAddQuestion = () => {
        const newQuestion = {
            questionType: 'MCQ',
            questionNumber: Date.now().toString(),
            questionContent: '',
            questionMarks: 0,
            questionOptions: [],
            questionAnswerOptions: [],
            questionAnswer: '',
        };
        setExamData({ ...examData, Questions: [...examData.Questions, newQuestion] });
    };

    const handleDeleteQuestion = (questionNumber) => {
        setExamData({
            ...examData,
            Questions: examData.Questions.filter((q) => q.questionNumber !== questionNumber),
        });
    };

    const handleSave = () => {
        const finalQuestions = examData.Questions.map((q, index) => ({
            ...q,
            questionNumber: index + 1,
            questionMarks: parseFloat(q.questionMarks) || 0,
        }));

        const totalMarks = finalQuestions.reduce((acc, curr) => acc + curr.questionMarks, 0);

        const postData = {
            ...examData,
            examMarks: totalMarks,
            examWeightage: parseFloat(examData.examWeightage) || 0,
            startTiming: new Date(`${examData.date}T${examData.startTime}`),
            endTiming: new Date(`${examData.date}T${examData.endTime}`),
            Questions: finalQuestions,
        };

        dispatch(saveExam({ exam: postData, courseDetails: course }));
        alert('Exam saved successfully!');
    };
    
    const handleInputChange = (e) => {
        setExamData({ ...examData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Paper sx={{ p: 4, my: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Edit Exam
                    </Typography>
                    <Typography variant="h6" gutterBottom color="text.secondary">
                        Course: {course.courseName}
                    </Typography>

                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h5">General Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="examName" label="Exam Name" fullWidth value={examData.examName} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="examWeightage" label="Weightage" type="number" fullWidth value={examData.examWeightage} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField name="date" label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={examData.date} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField name="startTime" label="Start Time" type="time" fullWidth InputLabelProps={{ shrink: true }} value={examData.startTime} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField name="endTime" label="End Time" type="time" fullWidth InputLabelProps={{ shrink: true }} value={examData.endTime} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="instructions" label="Instructions" multiline rows={4} fullWidth value={examData.instructions} onChange={handleInputChange} />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    
                    <Box sx={{ my: 4 }}>
                        <Typography variant="h5">Questions</Typography>
                        {examData.Questions.map((question, index) => (
                            <ExamQuestion
                                key={question.questionNumber}
                                question={question}
                                qnIndex={index}
                                handleDeleteQuestion={handleDeleteQuestion}
                                examData={examData}
                                setExamData={setExamData}
                            />
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <IconButton onClick={handleAddQuestion} color="primary" size="large">
                                <AddCircleIcon fontSize="large" />
                            </IconButton>
                        </Box>
                    </Box>

                    <Button variant="contained" color="primary" size="large" onClick={handleSave} sx={{ display: 'block', mx: 'auto' }}>
                        Save Exam
                    </Button>
                </Paper>
            </Container>
        </>
    );
}

export default EditExam;