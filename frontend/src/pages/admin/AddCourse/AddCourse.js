import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import { addCourse } from '../../../redux/actions/Admin';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

function AddCourse() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [formCourse, setFormCourse] = useState({
        courseCode: '',
        courseName: '',
        description: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        dispatch(addCourse(formCourse));
        handleClose();
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add Course
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="add-course-modal-title"
                aria-describedby="add-course-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="add-course-modal-title" variant="h6" component="h2">
                        Add a New Course
                    </Typography>
                    <Box
                        component="form"
                        sx={{ mt: 2 }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="course-code"
                            label="Course Code"
                            name="course-code"
                            autoFocus
                            value={formCourse.courseCode}
                            onChange={(e) =>
                                setFormCourse({ ...formCourse, courseCode: e.target.value })
                            }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="course-name"
                            label="Course Name"
                            name="course-name"
                            value={formCourse.courseName}
                            onChange={(e) =>
                                setFormCourse({ ...formCourse, courseName: e.target.value })
                            }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="course-description"
                            label="Course Description"
                            name="course-description"
                            multiline
                            rows={4}
                            value={formCourse.description}
                            onChange={(e) =>
                                setFormCourse({ ...formCourse, description: e.target.value })
                            }
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Add Course
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default AddCourse;