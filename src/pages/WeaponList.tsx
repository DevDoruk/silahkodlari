import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import axios from 'axios';

interface Weapon {
  _id: string;
  name: string;
  image: string;
  description: string;
}

const WeaponList = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);

  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/weapons');
        setWeapons(response.data);
      } catch (error) {
        console.error('Error fetching weapons:', error);
      }
    };

    fetchWeapons();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Silah Listesi
      </Typography>
      <Grid container spacing={3}>
        {weapons.map((weapon) => (
          <Grid item xs={12} sm={6} md={4} key={weapon._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={weapon.image}
                alt={weapon.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {weapon.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {weapon.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WeaponList; 