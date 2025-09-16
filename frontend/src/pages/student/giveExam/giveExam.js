import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Grid,
    Container,
    Typography,
    Paper,
    Box,
    Button,
} from '@mui/material';
import ExamQuestion from '../../../components/student/GiveExam/ExamQuestion/ExamQuestion';
import Navbar from '../../../components/student/GiveExam/Navbar/Navbar';
import { setInitialResponses, saveResponses } from '../../../redux/actions/Responses';

function GiveExam() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { exam, course } = state;
    const Questions = exam.Questions;

    const responses = useSelector((state) => state.responses);
    
    const [chosenQnIndex, setChosenQnIndex] = useState(0);

    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        if (responses.length !== Questions.length) {
            dispatch(setInitialResponses(exam));
        }
    }, [dispatch, exam, Questions.length, responses.length]);
    
    useEffect(() => {
        const timer = setInterval(() => {
            const distance = new Date(exam.endTiming) - new Date();
            if (distance < 0) {
                clearInterval(timer);
                handleSubmit();
            } else {
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [exam.endTiming]);

    const autoSave = useRef();

    useEffect(() => {
      clearTimeout(autoSave.current);
      autoSave.current = setTimeout(() => {
          if (responses.length > 0) {
              const courseDetails = { ...course, exam_id: exam._id };
              dispatch(saveResponses({ courseDetails, responses }));
          }
      }, 5000); // Autosave every 5 seconds
  
      return () => clearTimeout(autoSave.current);
    }, [responses, course, exam._id, dispatch]);

    const handleSubmit = () => {
        const courseDetails = { ...course, exam_id: exam._id };
        dispatch(saveResponses({ courseDetails, responses }));
        navigate('/student');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Attempted':
                return 'primary.main';
            case 'NotAttempted':
                return 'error.main';
            default:
                return 'grey.500';
        }
    };
    
    if (responses.length !== Questions.length) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5">{exam.examName}</Typography>
                    <Typography variant="h6" color="error">
                        Time Left: {timeLeft}
                    </Typography>
                </Paper>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={9}>
                        <ExamQuestion
                            question={Questions[chosenQnIndex]}
                            response={responses[chosenQnIndex]}
                        />
                         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button
                                variant="contained"
                                disabled={chosenQnIndex === 0}
                                onClick={() => setChosenQnIndex(chosenQnIndex - 1)}
                            >
                                Previous
                            </Button>
                            {chosenQnIndex < Questions.length - 1 ? (
                                <Button
                                    variant="contained"
                                    onClick={() => setChosenQnIndex(chosenQnIndex + 1)}
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={handleSubmit}>
                                    Submit Exam
                                </Button>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Questions
                            </Typography>
                            <Grid container spacing={1}>
                                {Questions.map((q, index) => (
                                    <Grid item xs={3} key={q.questionNumber}>
                                        <Button
                                            fullWidth
                                            variant={chosenQnIndex === index ? "contained" : "outlined"}
                                            onClick={() => setChosenQnIndex(index)}
                                            sx={{ 
                                                minWidth: 'auto', 
                                                p: 1,
                                                backgroundColor: getStatusColor(responses[index]?.status),
                                                color: 'white'
                                            }}
                                        >
                                            {index + 1}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default GiveExam;