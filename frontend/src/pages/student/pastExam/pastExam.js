import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Box,
    Card,
    CardContent,
} from '@mui/material';
import Navbar from '../../../components/student/CourseHomepage/Navbar/Navbar'
import "./style.css"

function PastExam() {
    const studentEmail = localStorage.getItem('studentEmail');
    const { state } = useLocation();
    const course = state.course;

    const isPastExam = (endTiming) => new Date(endTiming) < new Date();
    const pastExams = course.Exams.filter((exam) => isPastExam(exam.endTiming));

    const findMarksObtained = (exam) => {
        const submission = exam.Submissions.find((sub) => sub.studentEmail === studentEmail);
        return submission ? submission.marksObtained : 'Not Submitted';
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
                                    <Typography variant="h6" sx={{ mt: 2 }}>
                                        Marks Obtained: {findMarksObtained(exam)} / {exam.examMarks}
                                    </Typography>
                                </CardContent>
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