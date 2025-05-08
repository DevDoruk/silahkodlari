import React from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import { FaTwitch, FaYoutube, FaInstagram } from 'react-icons/fa';

const TwitchIcon = FaTwitch as unknown as React.FC<{ size?: number }>;
const YoutubeIcon = FaYoutube as unknown as React.FC<{ size?: number }>;
const InstagramIcon = FaInstagram as unknown as React.FC<{ size?: number }>;

const Footer: React.FC = () => (
  <Box sx={{ mt: 8, py: 3, bgcolor: 'background.paper', textAlign: 'center' }}>
    <Typography variant="body1" sx={{ mb: 1 }}>
      Hakkında: Bu site Efix tarafından Delta Force silah kodlarını paylaşmak ve toplulukla buluşturmak için hazırlanmıştır.
    </Typography>
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 1 }}>
      <IconButton component="a" href="https://twitch.tv/efixgg" target="_blank" rel="noopener noreferrer" color="primary">
        <TwitchIcon size={28} />
      </IconButton>
      <IconButton component="a" href="https://youtube.com/@efixgg" target="_blank" rel="noopener noreferrer" color="error">
        <YoutubeIcon size={28} />
      </IconButton>
      <IconButton component="a" href="https://instagram.com/efix_gg" target="_blank" rel="noopener noreferrer" color="secondary">
        <InstagramIcon size={28} />
      </IconButton>
    </Stack>
    <Typography variant="caption" color="text.secondary">
      © {new Date().getFullYear()} Efix | Delta Force Silah Kodları
    </Typography>
  </Box>
);

export default Footer; 