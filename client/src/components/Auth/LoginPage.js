import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box, Link, Grid } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { login } from '../../api';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import Protect from '../../context/Protect';
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  Protect();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setLoginError(null);
    try {
      const response = await login(values);
      if (response && response.token) {
        localStorage.setItem('token', response.token);

        authLogin();

        console.log('Login successful');
        navigate('/');
      }
      else {
        setFieldError('login', 'Login failed: Invalid credentials');
        setLoginError('Login failed: Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setFieldError('login', 'Login failed: Invalid credentials');
      setLoginError('Login failed: Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, values, handleChange }) => (
            <Form>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {loginError && (
                  <Grid item xs={12}>
                    <Box sx={{ color: 'error.main', textAlign: 'center' }}>{loginError}</Box>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default LoginPage;