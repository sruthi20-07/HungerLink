import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ProfilePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account and organization information.
        </Typography>
      </Box>
      
      <Typography variant="body1">
        Profile management will be implemented here.
      </Typography>
    </Container>
  );
};

export default ProfilePage;