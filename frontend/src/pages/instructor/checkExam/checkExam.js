import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Box,
    Button,
} from '@mui/material';
import ExamQuestion from '../../../components/instructor/CheckExam/ExamQuestion/ExamQuestion';
import Navbar from '../../../components/instructor/CheckExam/Navbar/Navbar';
import { saveCheckedResponses } from '../../../redux/actions/Instructor';

function CheckExam() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const dispatch = useDispatch();
    const { course, exam, submission } = state;
    
    const [responses, setResponses] = useState(submission.responses);

    const handleMarksChange = (qnIndex, marks) => {
        const newResponses = [...responses];
        newResponses[qnIndex].marksObtained = parseInt(marks, 10) || 0;
        setResponses(newResponses);
    };

    const handleSubmit = () => {
        const checkedData = {
            course,
            exam,
            studentEmail: submission.studentEmail,
            responses,
        };
        dispatch(saveCheckedResponses(checkedData));
        alert('Checked responses have been saved.');
        navigate('/instructor');
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Paper sx={{ p: 4, my: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Check Exam: {exam.examName}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Submission by: {submission.studentEmail}
                    </Typography>

                    <Box sx={{ my: 4 }}>
                        {responses.map((response, index) => (
                            <ExamQuestion
                                key={index}
                                question={exam.Questions[index]}
                                response={response}
                                index={index}
                                onMarksChange={handleMarksChange}
                            />
                        ))}
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleSubmit}
                        sx={{ display: 'block', mx: 'auto' }}
                    >
                        Submit Checked Exam
                    </Button>
                </Paper>
            </Container>
        </>
    );
}

export default CheckExam;