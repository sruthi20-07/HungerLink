import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const NotificationsPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage your notifications.
        </Typography>
      </Box>
      
      <Typography variant="body1">
        Notifications management will be implemented here.
      </Typography>
    </Container>
  );
};

export default NotificationsPage;