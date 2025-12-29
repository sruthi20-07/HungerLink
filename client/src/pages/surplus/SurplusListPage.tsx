import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const SurplusListPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Surplus Food
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse and manage surplus food reports.
        </Typography>
      </Box>
      
      <Typography variant="body1">
        Surplus list functionality will be implemented here.
      </Typography>
    </Container>
  );
};

export default SurplusListPage;