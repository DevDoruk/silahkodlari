import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Efix | Delta Force Silah Kodları
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Anasayfa
          </Button>
          <Button color="inherit" component={RouterLink} to="/weapons">
            Silahlar
          </Button>
          {isAuthenticated && isAdmin && (
            <Button color="inherit" component={RouterLink} to="/add">
              Silah Ekle
            </Button>
          )}
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Çıkış
            </Button>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Giriş
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 