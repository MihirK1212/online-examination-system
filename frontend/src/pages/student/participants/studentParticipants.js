import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    Box,
} from '@mui/material';
import Navbar from '../../../components/student/Participants/Navbar/Navbar';
import DefaultAvatar from './profileIMG2.jpg';
import { getParticipants } from '../../../api';

function StudentParticipants() {
    const { state } = useLocation();
    const course = state.course;
    const { studentsList, instructorsList } = course;
    const [participants, setParticipants] = useState({ studentParticipants: [], instructorParticipants: [] });

    useEffect(() => {
        getParticipants({ studentsList, instructorsList }).then((response) => {
            setParticipants(response.data.participants);
        });
    }, [studentsList, instructorsList]);

    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Participants for {course.courseName}
                    </Typography>

                    <Paper sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" sx={{ p: 2 }}>
                            Instructors
                        </Typography>
                        <List>
                            {participants.instructorParticipants.map((p) => (
                                <ListItem key={p.instructorEmail}>
                                    <ListItemAvatar>
                                        <Avatar alt={p.instructorName} src={DefaultAvatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={p.instructorName} secondary={p.instructorEmail} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>

                    <Paper>
                        <Typography variant="h5" component="h2" sx={{ p: 2 }}>
                            Students
                        </Typography>
                        <List>
                            {participants.studentParticipants.map((p, index) => (
                                <React.Fragment key={p.studentEmail}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt={p.studentName} src={DefaultAvatar} />
                                        </ListItemAvatar>
                                        <ListItemText primary={p.studentName} secondary={p.studentEmail} />
                                    </ListItem>
                                    {index < participants.studentParticipants.length - 1 && <Divider variant="inset" component="li" />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Box>
            </Container>
        </>
    );
}

export default StudentParticipants;
