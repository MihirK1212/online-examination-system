import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Autocomplete,
    Paper,
} from '@mui/material';
import Navbar from '../../../components/admin/General/Navbar/Navbar';
import { addCourseInstance } from '../../../redux/actions/Admin';

function AddCourseInstance({ instructors }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const instructorEmails = instructors.map((instructor) => instructor.instructorEmail);
    const [selectedInstructors, setSelectedInstructors] = useState([]);
    const [formData, setFormData] = useState({
        courseCode: '',
        year: new Date().getFullYear(),
        semester: 'spring',
    });
    const [studentData, setStudentData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            const [headers, ...rows] = data;
            if (headers[0] !== 'Email') {
                alert("Invalid file format. The first column must be 'Email'.");
                return;
            }
            const studentEmails = rows.map((row) => ({ Email: row[0] })).filter(student => student.Email);
            setStudentData(studentEmails);
        };
        reader.readAsBinaryString(file);
    };

    const handleSubmit = () => {
        if (!formData.courseCode || selectedInstructors.length === 0 || studentData.length === 0) {
            alert('Please fill all fields, select instructors, and upload a student list.');
            return;
        }

        const postData = {
            ...formData,
            instructorsList: selectedInstructors,
            studentsList: studentData.map(s => s.Email),
            announcements: [],
            Exams: [],
        };

        dispatch(addCourseInstance(postData));
        alert('Course instance added successfully!');
        navigate('/admin');
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Paper sx={{ p: 4, mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Create Course Instance
                    </Typography>
                    <Box component="form" noValidate autoComplete="off">
                        <TextField
                            label="Course Code"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.courseCode}
                            onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                        />
                        <TextField
                            label="Year"
                            variant="outlined"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Semester</InputLabel>
                            <Select
                                value={formData.semester}
                                label="Semester"
                                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                            >
                                <MenuItem value={'spring'}>Spring</MenuItem>
                                <MenuItem value={'autumn'}>Autumn</MenuItem>
                            </Select>
                        </FormControl>
                        <Autocomplete
                            multiple
                            id="instructors-autocomplete"
                            options={instructorEmails}
                            value={selectedInstructors}
                            onChange={(event, newValue) => {
                                setSelectedInstructors(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Instructors"
                                    placeholder="Select Instructors"
                                    margin="normal"
                                />
                            )}
                        />
                        <Box sx={{ my: 2 }}>
                            <Typography variant="h6">Add Students</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Upload a .xlsx or .csv file with a single column named 'Email'.
                            </Typography>
                            <Button variant="contained" component="label" sx={{ mt: 1 }}>
                                Upload File
                                <input type="file" hidden accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
                            </Button>
                            {studentData.length > 0 && <Typography sx={{mt: 1}}>{studentData.length} students loaded.</Typography>}
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleSubmit}
                            sx={{ mt: 2 }}
                        >
                            Create Course Instance
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default AddCourseInstance;
