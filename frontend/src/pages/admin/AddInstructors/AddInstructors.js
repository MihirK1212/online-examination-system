import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import Navbar from '../../../components/admin/General/Navbar/Navbar';
import { addInstructors } from '../../../redux/actions/Admin';

function AddInstructors() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [instructorData, setInstructorData] = useState([]);
    const [fileName, setFileName] = useState('');

    const processData = (dataString) => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        const requiredHeaders = ['Email', 'Name', 'D_O_B', 'Phone_Number'];
        
        if (headers.length !== 4 || !requiredHeaders.every(h => headers.includes(h))) {
            alert('Invalid file format. Please ensure the headers are Email, Name, D_O_B, Phone_Number.');
            return;
        }

        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            if (headers && row.length === headers.length) {
                const obj = {};
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = row[j].replace(/"/g, '');
                }
                if (Object.values(obj).filter((x) => x).length > 0) {
                    list.push(obj);
                }
            }
        }
        setInstructorData(list);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            processData(data);
        };
        reader.readAsBinaryString(file);
    };

    const handleSubmit = () => {
        if (instructorData.length === 0) {
            alert('Please upload a file with instructor data.');
            return;
        }

        const instructors = instructorData.map((instructor) => ({
            instructorEmail: instructor.Email,
            generalDetails: {
                name: instructor.Name,
                dateOfBirth: instructor.D_O_B,
                phoneNumber: instructor.Phone_Number,
            },
            registeredCourses: [],
        }));
        
        dispatch(addInstructors(instructors));
        alert('Instructors added successfully!');
        navigate('/admin');
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Paper sx={{ p: 4, mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Add Instructors
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        Upload a .xlsx or .csv file with the columns: Email, Name, D_O_B, Phone_Number.
                    </Typography>
                    <Box>
                        <Button variant="contained" component="label">
                            Upload File
                            <input type="file" hidden accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
                        </Button>
                        {fileName && <Typography sx={{display: 'inline', ml: 2}}>{fileName}</Typography>}
                    </Box>
                    {instructorData.length > 0 && (
                        <TableContainer component={Paper} sx={{ mt: 3 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>D.O.B</TableCell>
                                        <TableCell>Phone Number</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {instructorData.map((d) => (
                                        <TableRow key={d.Email}>
                                            <TableCell>{d.Email}</TableCell>
                                            <TableCell>{d.Name}</TableCell>
                                            <TableCell>{d.D_O_B}</TableCell>
                                            <TableCell>{d.Phone_Number}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleSubmit}
                        sx={{ mt: 3 }}
                        disabled={instructorData.length === 0}
                    >
                        Submit
                    </Button>
                </Paper>
            </Container>
        </>
    );
}

export default AddInstructors;
