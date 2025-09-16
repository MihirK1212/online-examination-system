import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Box,
    Card,
    CardContent,
    CardActions,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../../../components/instructor/PastExam/Navbar/Navbar';
import { evaluateExam } from '../../../api';

function PastExam() {
    const navigate = useNavigate();
    const { state: course } = useLocation();
    
    const isPastExam = (endTiming) => new Date(endTiming) < new Date();
    const pastExams = course.Exams.filter((exam) => isPastExam(exam.endTiming));

    const handleEvaluate = (exam) => {
        evaluateExam({
            examDetails: exam,
            courseDetails: course,
        });
        alert('Exam evaluation has been initiated.');
        navigate('/instructor');
    };

    const goToCheckSubmission = (exam, submission) => {
        navigate('/instructor/checkExam', {
            state: { course, exam, submission },
        });
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Past Exams for {course.courseName}
                    </Typography>
                    {pastExams.length > 0 ? (
                        pastExams.map((exam) => (
                            <Card key={exam.examName} sx={{ mb: 3 }}>
                                <CardContent>
                                    <Typography variant="h5">{exam.examName}</Typography>
                                    <Typography color="text.secondary">
                                        Ended: {new Date(exam.endTiming).toLocaleString()}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>Total Marks: {exam.examMarks}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleEvaluate(exam)}>
                                        Evaluate Exam
                                    </Button>
                                </CardActions>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>View Submissions</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            {exam.Submissions.map((submission, index) => (
                                                <React.Fragment key={submission.studentEmail}>
                                                    <ListItem
                                                        secondaryAction={
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                onClick={() => goToCheckSubmission(exam, submission)}
                                                            >
                                                                View
                                                            </Button>
                                                        }
                                                    >
                                                        <ListItemText
                                                            primary={submission.studentEmail}
                                                            secondary={`Marks: ${submission.marksObtained}`}
                                                        />
                                                    </ListItem>
                                                    {index < exam.Submissions.length - 1 && <Divider />}
                                                </React.Fragment>
                                            ))}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </Card>
                        ))
                    ) : (
                        <Typography>No past exams found for this course.</Typography>
                    )}
                </Box>
            </Container>
        </>
    );
}

export default PastExam;