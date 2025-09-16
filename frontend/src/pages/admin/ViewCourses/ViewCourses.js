import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box
} from '@mui/material';
import Navbar from '../../../components/admin/General/Navbar/Navbar';

function ViewCourses({ students: courses }) { // Renamed prop for clarity
    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Course List
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="courses table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Course Code</TableCell>
                                    <TableCell>Course Name</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courses.map((course) => (
                                    <TableRow
                                        key={course.courseCode}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {course.courseCode}
                                        </TableCell>
                                        <TableCell>{course.courseName}</TableCell>
                                        <TableCell>{course.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </>
    );
}

export default ViewCourses;