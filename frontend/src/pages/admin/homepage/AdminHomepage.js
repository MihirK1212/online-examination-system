import React from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/admin/Homepage/Navbar/Navbar';
import AddCourse from '../AddCourse/AddCourse';

import StudentImage from './student.png';
import InstructorImage from './instructor.png';
import CourseImage from './cp.jpg';

function AdminHomepage() {
    const navigate = useNavigate();

    const adminActions = [
        {
            title: 'Add Students',
            image: StudentImage,
            action: () => navigate('/admin/addStudents'),
            component: null,
        },
        {
            title: 'Add Instructors',
            image: InstructorImage,
            action: () => navigate('/admin/addInstructors'),
            component: null,
        },
        {
            title: 'Add Course',
            image: CourseImage,
            action: null,
            component: <AddCourse />,
        },
    ];

    return (
        <>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                    Welcome to the Admin Dashboard
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {adminActions.map((item, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        objectFit: 'cover',
                                        height: 140,
                                    }}
                                    image={item.image}
                                    alt={item.title}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2" align="center">
                                        {item.title}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center', paddingBottom: '16px' }}>
                                    {item.action && (
                                        <Button variant="contained" color="primary" onClick={item.action}>
                                            {item.title}
                                        </Button>
                                    )}
                                    {item.component}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button variant="contained" size="large" onClick={() => navigate('/admin/addCourseInstance')}>
                        Create Course Instance
                    </Button>
                </Box>
            </Container>
        </>
    );
}

export default AdminHomepage;