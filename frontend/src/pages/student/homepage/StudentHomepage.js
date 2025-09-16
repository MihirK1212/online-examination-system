import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Box,
    Paper,
    Avatar,
} from '@mui/material';
import Navbar from '../../../components/student/Homepage/Navbar/Navbar';
import img_course from './course.jpg';
import DefaultAvatar from './profile.png';

function StudentHomepage({ courses, profile }) {
    const navigate = useNavigate();

    const goToCourse = (course) => {
        navigate('/student/CourseHomepage', {
            state: course,
        });
    };

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Welcome, {profile.name || 'Student'}!
                    </Typography>
                    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Avatar
                            alt={profile.name}
                            src={DefaultAvatar}
                            sx={{ width: 80, height: 80, mr: 2 }}
                        />
                        <Box>
                            <Typography variant="h6">{profile.name}</Typography>
                            <Typography color="text.secondary">Phone: {profile.phoneNumber}</Typography>
                            <Typography color="text.secondary">
                                Date of Birth: {new Date(profile.dateOfBirth).toLocaleDateString()}
                            </Typography>
                            <Typography color="text.secondary">Program: {profile.programName}</Typography>
                        </Box>
                    </Paper>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Enrolled Courses
                    </Typography>
                    <Grid container spacing={4}>
                        {courses.map((course) => (
                            <Grid item key={course.courseCode + course.year + course.semester} xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardMedia
                                        component="img"
                                        image={img_course}
                                        alt={course.courseName}
                                        height="140"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            {course.courseCode}
                                        </Typography>
                                        <Typography>{course.courseName}</Typography>
                                        <Typography color="text.secondary">
                                            {capitalizeFirstLetter(course.semester)} {course.year}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => goToCourse(course)}>
                                            View Course
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
}

export default StudentHomepage;

