import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

function Navbar({ course }) {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate('/student')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/student/participants', { state: course })}>
            Participants
          </Button>
          <Button color="inherit" onClick={() => navigate('/student/pastExam', { state: course })}>
            Past Exams
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

