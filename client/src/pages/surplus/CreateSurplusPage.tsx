import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const CreateSurplusPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Create Surplus Report
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Report available surplus food for pickup.
        </Typography>
      </Box>
      
      <Typography variant="body1">
        Surplus creation form will be implemented here.
      </Typography>
    </Container>
  );
};

export default CreateSurplusPage;