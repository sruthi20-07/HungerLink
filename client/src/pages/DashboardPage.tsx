import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
} from '@mui/material';
import {
  Restaurant,
  Add,
  TrendingUp,
  Notifications,
  LocationOn,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { RootState } from '@/store';
import { UserRole } from '@/types';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { unreadCount } = useSelector((state: RootState) => state.notifications);

  const isProvider = user?.role === UserRole.FOOD_PROVIDER;
  const isRecipient = user?.role === UserRole.FOOD_RECIPIENT;

  const quickActions = [
    ...(isProvider ? [{
      title: 'Create Surplus Report',
      description: 'Report available surplus food',
      icon: <Add />,
      action: () => navigate('/surplus/create'),
      color: 'primary' as const,
    }] : []),
    {
      title: isProvider ? 'My Surplus Reports' : 'Browse Available Surplus',
      description: isProvider ? 'View and manage your reports' : 'Find surplus food nearby',
      icon: <Restaurant />,
      action: () => navigate('/surplus'),
      color: 'secondary' as const,
    },
    {
      title: 'Notifications',
      description: `${unreadCount} unread notifications`,
      icon: <Notifications />,
      action: () => navigate('/notifications'),
      color: 'info' as const,
    },
  ];

  const stats = [
    {
      title: 'Reliability Score',
      value: user?.reliabilityScore?.toFixed(1) || '5.0',
      subtitle: 'out of 5.0',
      icon: <TrendingUp />,
      color: 'success',
    },
    {
      title: 'Location',
      value: user?.address?.city || 'Not set',
      subtitle: user?.address?.state || '',
      icon: <LocationOn />,
      color: 'info',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.organizationName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {isProvider 
            ? 'Help reduce food waste by reporting surplus food from your kitchen.'
            : 'Find and collect surplus food to help your community.'
          }
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={3} mb={4}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
              onClick={action.action}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: `${action.color}.light`,
                      color: `${action.color}.contrastText`,
                      mr: 2,
                    }}
                  >
                    {action.icon}
                  </Box>
                  <Typography variant="h6" component="div">
                    {action.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Stats */}
      <Grid container spacing={3} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: `${stat.color}.light`,
                      color: `${stat.color}.contrastText`,
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h6" component="div">
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h4" component="div" gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Role-specific information */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {isProvider ? 'Food Provider Guidelines' : 'Food Recipient Guidelines'}
          </Typography>
          
          {isProvider ? (
            <Box>
              <Typography variant="body2" paragraph>
                As a food provider, you help reduce waste by reporting surplus food. Here are some tips:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" variant="body2">
                  Report surplus as soon as you know it's available
                </Typography>
                <Typography component="li" variant="body2">
                  Provide accurate quantity estimates and pickup windows
                </Typography>
                <Typography component="li" variant="body2">
                  Follow food safety guidelines (max 4-hour pickup window)
                </Typography>
                <Typography component="li" variant="body2">
                  Update or cancel reports if circumstances change
                </Typography>
              </Box>
              <Box mt={2}>
                <Chip label="Food Safety" color="warning" size="small" sx={{ mr: 1 }} />
                <Chip label="Timely Updates" color="info" size="small" sx={{ mr: 1 }} />
                <Chip label="Accurate Info" color="success" size="small" />
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="body2" paragraph>
                As a food recipient, you help distribute surplus food to those in need. Here are some tips:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" variant="body2">
                  Respond quickly to surplus notifications
                </Typography>
                <Typography component="li" variant="body2">
                  Only claim surplus you can actually collect
                </Typography>
                <Typography component="li" variant="body2">
                  Arrive on time for scheduled pickups
                </Typography>
                <Typography component="li" variant="body2">
                  Confirm completion after successful pickup
                </Typography>
              </Box>
              <Box mt={2}>
                <Chip label="Quick Response" color="primary" size="small" sx={{ mr: 1 }} />
                <Chip label="Reliable Pickup" color="success" size="small" sx={{ mr: 1 }} />
                <Chip label="Community Impact" color="secondary" size="small" />
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default DashboardPage;