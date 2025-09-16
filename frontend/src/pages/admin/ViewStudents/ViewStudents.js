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

function ViewStudents({ students }) {
    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Student List
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="students table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Date of Birth</TableCell>
                                    <TableCell>Degree</TableCell>
                                    <TableCell>Program</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((student) => (
                                    <TableRow
                                        key={student.studentEmail}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{student.generalDetails.name}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {student.studentEmail}
                                        </TableCell>
                                        <TableCell>{new Date(student.generalDetails.dateOfBirth).toLocaleDateString()}</TableCell>
                                        <TableCell>{student.generalDetails.degree}</TableCell>
                                        <TableCell>{student.generalDetails.programName}</TableCell>
                                        <TableCell>{student.generalDetails.phoneNumber}</TableCell>
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

export default ViewStudents;