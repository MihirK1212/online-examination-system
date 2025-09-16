import React, { useState } from 'react';
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
    TextField,
} from '@mui/material';
import Navbar from '../../../components/instructor/CourseHomepage/Navbar/Navbar';
import { addAnnouncement } from '../../../api';

function CourseHomepage() {
    const { state: course } = useLocation();
    const navigate = useNavigate();
    const [formAnnouncement, setFormAnnouncement] = useState('');
    const [announcements, setAnnouncements] = useState(course.announcements);

    const isUpcoming = (startTiming) => new Date(startTiming) > new Date();

    const goToExam = (exam) => {
        navigate('/instructor/editExam', {
            state: { exam, course },
        });
    };

    const handleAddAnnouncement = () => {
        if (!formAnnouncement.trim()) return;
        addAnnouncement({ course, announcement: formAnnouncement }).then(() => {
            setAnnouncements([...announcements, formAnnouncement]);
            setFormAnnouncement('');
        });
    };

    const upcomingExams = course.Exams.filter((exam) => isUpcoming(exam.startTiming));

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
                            Upcoming Exams
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
                                        <Button size="small" onClick={() => goToExam(exam)}>
                                            Edit Exam
                                        </Button>
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
                                {announcements.map((announcement, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={announcement} />
                                    </ListItem>
                                ))}
                            </List>
                            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                <TextField
                                    label="New Announcement"
                                    variant="outlined"
                                    fullWidth
                                    value={formAnnouncement}
                                    onChange={(e) => setFormAnnouncement(e.target.value)}
                                />
                                <Button variant="contained" onClick={handleAddAnnouncement}>
                                    Add
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default CourseHomepage;


