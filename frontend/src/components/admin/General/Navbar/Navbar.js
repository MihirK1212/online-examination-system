import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate('/admin')}>
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

