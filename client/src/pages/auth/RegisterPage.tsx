import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import toast from 'react-hot-toast';

import { RootState } from '@/store';
import { register as registerUser, clearError } from '@/store/slices/authSlice';
import { RegisterForm, UserRole } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';

const steps = ['Account Details', 'Organization Info', 'Location'];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm<RegisterForm>();

  const watchedRole = watch('role');
  const watchedPassword = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await dispatch(registerUser(registerData) as any).unwrap();
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error || 'Registration failed');
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watchedPassword || 'Passwords do not match',
                })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!errors.role}>
                <InputLabel id="role-label">Role</InputLabel>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: 'Role is required' }}
                  render={({ field }) => (
                    <Select
                      labelId="role-label"
                      label="Role"
                      {...field}
                    >
                      <MenuItem value={UserRole.FOOD_PROVIDER}>
                        Food Provider (Canteen/Mess)
                      </MenuItem>
                      <MenuItem value={UserRole.FOOD_RECIPIENT}>
                        Food Recipient (NGO/Organization)
                      </MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        );
        
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="organizationName"
                label="Organization Name"
                error={!!errors.organizationName}
                helperText={errors.organizationName?.message}
                {...register('organizationName', {
                  required: 'Organization name is required',
                })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="contactPhone"
                label="Contact Phone"
                error={!!errors.contactPhone}
                helperText={errors.contactPhone?.message}
                {...register('contactPhone', {
                  pattern: {
                    value: /^\+?[\d\s-()]+$/,
                    message: 'Invalid phone number format',
                  },
                })}
              />
            </Grid>
          </Grid>
        );
        
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="street"
                label="Street Address"
                error={!!errors.address?.street}
                helperText={errors.address?.street?.message}
                {...register('address.street', {
                  required: 'Street address is required',
                })}
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="city"
                label="City"
                error={!!errors.address?.city}
                helperText={errors.address?.city?.message}
                {...register('address.city', {
                  required: 'City is required',
                })}
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="state"
                label="State"
                error={!!errors.address?.state}
                helperText={errors.address?.state?.message}
                {...register('address.state', {
                  required: 'State is required',
                })}
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="zipCode"
                label="ZIP Code"
                error={!!errors.address?.zipCode}
                helperText={errors.address?.zipCode?.message}
                {...register('address.zipCode', {
                  required: 'ZIP code is required',
                })}
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="country"
                label="Country"
                defaultValue="India"
                {...register('address.country')}
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="longitude"
                label="Longitude"
                type="number"
                inputProps={{ step: 'any' }}
                error={!!errors.coordinates?.[0]}
                helperText={errors.coordinates?.[0] ? 'Longitude is required' : 'Use GPS or map to get coordinates'}
                {...register('coordinates.0', {
                  required: 'Longitude is required',
                  valueAsNumber: true,
                  min: { value: -180, message: 'Invalid longitude' },
                  max: { value: 180, message: 'Invalid longitude' },
                })}
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="latitude"
                label="Latitude"
                type="number"
                inputProps={{ step: 'any' }}
                error={!!errors.coordinates?.[1]}
                helperText={errors.coordinates?.[1] ? 'Latitude is required' : 'Use GPS or map to get coordinates'}
                {...register('coordinates.1', {
                  required: 'Latitude is required',
                  valueAsNumber: true,
                  min: { value: -90, message: 'Invalid latitude' },
                  max: { value: 90, message: 'Invalid latitude' },
                })}
              />
            </Grid>
          </Grid>
        );
        
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4" color="primary" gutterBottom>
              HungerLink
            </Typography>
            <Typography component="h2" variant="h5" gutterBottom>
              Create Account
            </Typography>
            
            <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1, width: '100%' }}
            >
              {renderStepContent(activeStep)}
              
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ py: 1.5, px: 4 }}
                  >
                    {loading ? <LoadingSpinner size={24} /> : 'Create Account'}
                  </Button>
                ) : (
                  <Button onClick={handleNext} variant="contained">
                    Next
                  </Button>
                )}
              </Box>
              
              <Box textAlign="center" mt={2}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    style={{
                      color: 'inherit',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;