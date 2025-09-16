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

function ViewInstructors({ students: instructors }) { // Renamed prop for clarity
    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Instructor List
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="instructors table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Date of Birth</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {instructors.map((instructor) => (
                                    <TableRow
                                        key={instructor.instructorEmail}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{instructor.generalDetails.name}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {instructor.instructorEmail}
                                        </TableCell>
                                        <TableCell>{new Date(instructor.generalDetails.dateOfBirth).toLocaleDateString()}</TableCell>
                                        <TableCell>{instructor.generalDetails.phoneNumber}</TableCell>
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

export default ViewInstructors;