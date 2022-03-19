import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { useState } from "react";
import TextField from "@material-ui/core/TextField";

function AddCourse() {
    
    const [formCourse, setFormCourse] = useState({"courseCode":"","courseName":"","description":""})

    function getModalStyle() {
        const top = 50
        const left = 50
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const useStyles = makeStyles(theme => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            position: 'absolute',
            width: 450,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const initial = sectionChild.visible

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add Course
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form id="form">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="course-code"
                            label={"Course Code"}
                            type="text"
                            name="course-code"
                            autoComplete="Course Code"
                            className="field"
                            value={formCourse.courseCode}
                            onChange={(e) =>setFormCourse({ ...formCourse, courseCode: e.target.value })}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="course-name"
                            label={"Course Name"}
                            type="text"
                            name="course-name"
                            autoComplete="Course Name"
                            className="field"
                            value={formCourse.courseName}
                            onChange={(e) =>setFormCourse({ ...formCourse, courseName: e.target.value })}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="course-description"
                            label={"Course Description"}
                            type="text"
                            name="course-code"
                            autoComplete="Course Description"
                            className="field"
                            value={formCourse.description}
                            onChange={(e) =>setFormCourse({ ...formCourse, description: e.target.value })}
                        />

                        <Button type="button">Confirm</Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default AddCourse