import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

function Navbar({ course }) {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate('/instructor')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/instructor/addExam', { state: course })}>
            Add Exam
          </Button>
          <Button color="inherit" onClick={() => navigate('/instructor/pastExam', { state: course })}>
            Past Exams
          </Button>
          <Button color="inherit" onClick={() => navigate('/instructor/participants', { state: course })}>
            Participants
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

