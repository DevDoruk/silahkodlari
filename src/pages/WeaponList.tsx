import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import axios from 'axios';

interface Weapon {
  _id: string;
  name: string;
  image: string;
  description: string;
  votes: number;
}

const WeaponList = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [voted, setVoted] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const response = await axios.get('/api/weapons');
        setWeapons(response.data);
        // localStorage'dan oy verilenleri yükle
        const votedWeapons = JSON.parse(localStorage.getItem('votedWeapons') || '{}');
        setVoted(votedWeapons);
      } catch (error) {
        console.error('Error fetching weapons:', error);
      }
    };
    fetchWeapons();
  }, []);

  const handleVote = async (id: string, type: 'upvote' | 'downvote') => {
    if (voted[id]) return;
    try {
      const response = await axios.post(`/api/weapons/${id}/${type}`);
      setWeapons((prev) =>
        prev.map((w) => (w._id === id ? { ...w, votes: response.data.votes } : w))
      );
      const newVoted = { ...voted, [id]: true };
      setVoted(newVoted);
      localStorage.setItem('votedWeapons', JSON.stringify(newVoted));
    } catch (error) {
      alert('Sadece bir kez oy verebilirsin!');
    }
  };

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
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleVote(weapon._id, 'upvote')}
                    disabled={!!voted[weapon._id]}
                    sx={{ mr: 1 }}
                  >
                    Upvote
                  </Button>
                  <Typography variant="body1" sx={{ mx: 1 }}>
                    {weapon.votes}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleVote(weapon._id, 'downvote')}
                    disabled={!!voted[weapon._id]}
                  >
                    Downvote
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WeaponList; 