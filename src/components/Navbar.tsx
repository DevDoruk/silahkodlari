import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Delta Force Silah Kodları
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Ana Sayfa
          </Button>
          <Button color="inherit" component={RouterLink} to="/weapons">
            Silahlar
          </Button>
          <Button color="inherit" component={RouterLink} to="/add">
            Silah Ekle
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 