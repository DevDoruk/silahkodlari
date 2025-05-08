import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Delta Force Silah Kodları
        </Typography>
        <Typography variant="body1" paragraph>
          Bu platformda Delta Force oyunu için özel silah kodlarını paylaşıyoruz. 
          Silahları görüntülemek için "Silahlar" sayfasını ziyaret edebilirsiniz.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Özellikler:
          </Typography>
          <ul>
            <li>Özel silah kodları</li>
            <li>Silah görselleri</li>
            <li>Kategori bazlı filtreleme</li>
            <li>Mobil uyumlu arayüz</li>
          </ul>
        </Box>
      </Paper>
      <Footer />
    </Container>
  );
};

export default Home; 