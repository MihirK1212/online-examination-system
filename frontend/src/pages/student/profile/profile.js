import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    Grid,
    Card,
    CardContent,
    Avatar,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import Navbar from '../../../components/student/Participants/Navbar/Navbar'; // Assuming a generic student navbar exists
import DefaultAvatar from './profile.png';

// Mock data, replace with actual data fetching
const studentData = {
    studentEmail: 'cse200001063@iiti.ac.in',
    generalDetails: {
        name: 'Priyansh Jaseja',
        dateOfBirth: '2001-11-11',
        phoneNumber: '9424664100',
        programName: 'B.Tech. in Computer Science',
    },
    registeredCourses: [
        { courseCode: 'CS 202', year: 2022, semester: 'Spring', grade: 'A' },
        { courseCode: 'CS 203', year: 2022, semester: 'Autumn', grade: 'A+' },
        { courseCode: 'MA 201', year: 2022, semester: 'Spring', grade: 'B' },
    ],
};

function Profile() {
    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Student Profile
                    </Typography>
                    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Avatar
                            alt={studentData.generalDetails.name}
                            src={DefaultAvatar}
                            sx={{ width: 100, height: 100, mr: 3 }}
                        />
                        <Box>
                            <Typography variant="h5">{studentData.generalDetails.name}</Typography>
                            <Typography color="text.secondary">{studentData.studentEmail}</Typography>
                            <Typography color="text.secondary">
                                DOB: {new Date(studentData.generalDetails.dateOfBirth).toLocaleDateString()}
                            </Typography>
                            <Typography color="text.secondary">
                                Program: {studentData.generalDetails.programName}
                            </Typography>
                        </Box>
                    </Paper>

                    <Typography variant="h5" component="h2" gutterBottom>
                        Course History
                    </Typography>
                    <Paper>
                        <List>
                            {studentData.registeredCourses.map((course, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <ListItemText
                                            primary={`${course.courseCode} (${course.semester} ${course.year})`}
                                            secondary={`Grade: ${course.grade}`}
                                        />
                                    </ListItem>
                                    {index < studentData.registeredCourses.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Box>
            </Container>
        </>
    );
}

export default Profile;