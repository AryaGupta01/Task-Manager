import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const NavBar = () => {
  const { isLoggedIn, logout } = useAuth(); // Use the auth context

  const handleLogout = () => {
    logout(); // Call the logout function from the context
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Button color="inherit" component={NavLink} to="/" >
          Task List
        </Button>
        {isLoggedIn && (
          <Button color="inherit" component={NavLink} to="/dashboard" >
            Dashboard
          </Button>
        )}
        {!isLoggedIn ? (
          <>
            <Button color="inherit" component={NavLink} to="/login" >
              Login
            </Button>
            <Button color="inherit" component={NavLink} to="/signup" >
              Signup
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;