import React from 'react';
import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	Container,
	Grid,
	Card,
	CardMedia,
	CardContent,
    CardActions,
    Button
} from "@mui/material";
import { Link } from 'react-router-dom';

import AdminImage from "./admin.png"
import InstructorImage from "./instructor.png"
import StudentImage from "./student.png"

function MainHomepage() {
    const loginOptions = [
        {
            title: "Admin",
            image: AdminImage,
            link: "/login/admin"
        },
        {
            title: "Instructor",
            image: InstructorImage,
            link: "/login/instructor"
        },
        {
            title: "Student",
            image: StudentImage,
            link: "/login/student"
        }
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Examination System
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container
                maxWidth="md"
                sx={{
                    py: 8,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Welcome to the Examination System
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" paragraph>
                    Please select your role to login.
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {loginOptions.map((option) => (
                        <Grid item key={option.title} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        pt: '10%',
                                        objectFit: 'contain',
                                        height: '150px'
                                    }}
                                    image={option.image}
                                    alt={option.title}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2" align="center">
                                        {option.title}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{justifyContent:'center', paddingBottom:'16px'}}>
                                    <Button component={Link} to={option.link} variant="contained" color="primary">
                                        Login as {option.title}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default MainHomepage;