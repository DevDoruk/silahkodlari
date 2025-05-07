import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  MenuItem,
  Box,
  Paper
} from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface Weapon {
  id: string;
  name: string;
  type: string;
  code: string;
  description: string;
  imageUrl: string;
}

const weaponTypes = [
  'Tümü',
  'Tüfek',
  'Tabanca',
  'Makineli Tüfek',
  'Keskin Nişancı Tüfeği',
  'Av Tüfeği'
];

const WeaponList = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [filteredWeapons, setFilteredWeapons] = useState<Weapon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tümü');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const weaponsCollection = collection(db, 'weapons');
        const weaponsSnapshot = await getDocs(weaponsCollection);
        const weaponsList = weaponsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Weapon[];
        
        setWeapons(weaponsList);
        setFilteredWeapons(weaponsList);
      } catch (error) {
        console.error('Error fetching weapons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeapons();
  }, []);

  useEffect(() => {
    let filtered = weapons;

    if (selectedType !== 'Tümü') {
      filtered = filtered.filter(weapon => weapon.type === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(weapon =>
        weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        weapon.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredWeapons(filtered);
  }, [weapons, searchTerm, selectedType]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Yükleniyor...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Silah Listesi
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            label="Silah Ara"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
          <TextField
            fullWidth
            select
            label="Silah Türü"
            value={selectedType}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedType(e.target.value)}
          >
            {weaponTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
          {filteredWeapons.map((weapon) => (
            <Card key={weapon.id}>
              {weapon.imageUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  image={weapon.imageUrl}
                  alt={weapon.name}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {weapon.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {weapon.type}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" component="pre" sx={{ 
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    backgroundColor: '#f5f5f5',
                    p: 1,
                    borderRadius: 1
                  }}>
                    {weapon.code}
                  </Typography>
                </Box>
                {weapon.description && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {weapon.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default WeaponList; 