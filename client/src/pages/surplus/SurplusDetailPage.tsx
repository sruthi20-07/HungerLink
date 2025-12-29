import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const SurplusDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Surplus Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage surplus report #{id}.
        </Typography>
      </Box>
      
      <Typography variant="body1">
        Surplus detail view will be implemented here.
      </Typography>
    </Container>
  );
};

export default SurplusDetailPage;