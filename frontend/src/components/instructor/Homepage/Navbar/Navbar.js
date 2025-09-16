import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate('/instructor')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/instructor/profile')}>
            Profile
          </Button>
        </Box>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

