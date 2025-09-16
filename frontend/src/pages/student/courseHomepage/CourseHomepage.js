import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import Navbar from '../../../components/student/CourseHomepage/Navbar/Navbar';

function CourseHomepage() {
    const { state: course } = useLocation();
    const navigate = useNavigate();

    const isUpcoming = (endTiming) => new Date(endTiming) > new Date();
    const isCurrent = (startTiming, endTiming) => {
        const now = new Date();
        return new Date(startTiming) <= now && now <= new Date(endTiming);
    };

    const goToExam = (exam) => {
        navigate('/student/giveExam', {
            state: { exam, course },
        });
    };

    const upcomingExams = course.Exams.filter((exam) => isUpcoming(exam.endTiming));

    return (
        <>
            <Navbar course={course} />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {course.courseName}
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Upcoming & Active Exams
                        </Typography>
                        {upcomingExams.length > 0 ? (
                            upcomingExams.map((exam) => (
                                <Card key={exam.examName} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6">{exam.examName}</Typography>
                                        <Typography color="text.secondary">
                                            Starts: {new Date(exam.startTiming).toLocaleString()}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            Ends: {new Date(exam.endTiming).toLocaleString()}
                                        </Typography>
                                        <Typography sx={{ mt: 1 }}>Marks: {exam.examMarks}, Weightage: {exam.examWeightage}</Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            <strong>Instructions:</strong> {exam.instructions}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {isCurrent(exam.startTiming, exam.endTiming) ? (
                                            <Button variant="contained" color="primary" onClick={() => goToExam(exam)}>
                                                Attempt Exam
                                            </Button>
                                        ) : (
                                            <Button variant="outlined" disabled>
                                                Upcoming
                                            </Button>
                                        )}
                                    </CardActions>
                                </Card>
                            ))
                        ) : (
                            <Typography>No upcoming exams.</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Announcements
                            </Typography>
                            <List>
                                {course.announcements.map((announcement, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={announcement} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default CourseHomepage;


