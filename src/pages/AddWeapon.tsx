import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, MenuItem } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

const weaponTypes = [
  'Tüfek',
  'Tabanca',
  'Makineli Tüfek',
  'Keskin Nişancı Tüfeği',
  'Av Tüfeği'
];

const AddWeapon = () => {
  const [weaponData, setWeaponData] = useState({
    name: '',
    type: '',
    code: '',
    description: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWeaponData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      if (image) {
        const storageRef = ref(storage, `weapons/${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'weapons'), {
        ...weaponData,
        imageUrl,
        createdAt: new Date()
      });

      setWeaponData({
        name: '',
        type: '',
        code: '',
        description: ''
      });
      setImage(null);
      alert('Silah başarıyla eklendi!');
    } catch (error) {
      console.error('Error adding weapon:', error);
      alert('Silah eklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Yeni Silah Ekle
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Silah Adı"
            name="name"
            value={weaponData.name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Silah Türü"
            name="type"
            value={weaponData.type}
            onChange={handleChange}
            required
            margin="normal"
          >
            {weaponTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Silah Kodu"
            name="code"
            value={weaponData.code}
            onChange={handleChange}
            required
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Açıklama"
            name="description"
            value={weaponData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            Silah Görseli Yükle
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {image && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Seçilen dosya: {image.name}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? 'Ekleniyor...' : 'Silah Ekle'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddWeapon; 