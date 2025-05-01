import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { signup } from '../../api'; // Import the signup API function
import Protect from '../../context/Protect';

const SignupPage = () => {  
  Protect();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const navigate = useNavigate();  
  const [errors, setErrors] = useState({});

  const handleSignup = async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await signup(values);
        if (response.user) {        
          navigate('/login');          
        } else {
          setErrors({ general: 'Signup failed' });
        }
      } catch (error) {
        console.error('Signup error:', error);
        setErrors({ general: 'Signup failed' });
      }
      finally{
          setSubmitting(false);
      }
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" sx={{marginBottom: 3}}>
          Sign Up
        </Typography>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
            <Form onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {errors.general && (
                <Typography color="error" variant="body2">
                  {errors.general}
                </Typography>
              )}
              <Link component={RouterLink} to="/login" variant="body2" sx={{ mt: 2 }}>
                {"Already have an account? Sign In"}
              </Link>
            </Form>
            )}
    </Formik>
        
      </Box>
    </Container>
  );
};

export default SignupPage;