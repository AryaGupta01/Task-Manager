import React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { createTask } from '../../api';

// Validation Schema using Yup
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  dueDate: Yup.date().required('Due date is required'),
  priority: Yup.string().oneOf(['Low', 'Medium', 'High']).required('Priority is required'),
});

const CreateTask = () => {
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await createTask(values);
      navigate('/tasks'); // Redirect to task list on success
    } catch (error) {
      console.error('Error creating task:', error);
      setErrors({ submit: 'Failed to create task' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography component="h1" variant="h5">Create New Task</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, values, handleChange }) => (
            <Form sx={{ width: '100%', mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field as={TextField}
                    margin="normal"
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                    error={touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field as={TextField}
                    margin="normal"
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field as={TextField}
                    margin="normal"
                    fullWidth
                    id="dueDate"
                    label="Due Date"
                    name="dueDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={touched.dueDate && !!errors.dueDate}
                    helperText={touched.dueDate && errors.dueDate}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal" error={touched.priority && !!errors.priority}>
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Field as={Select}
                      labelId="priority-label"
                      id="priority"
                      name="priority"
                      label="Priority"
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Field>
                    {touched.priority && errors.priority && <Typography color="error">{errors.priority}</Typography>}

                  </FormControl>
                </Grid>
              </Grid>
              

              {errors.submit && <Typography color="error">{errors.submit}</Typography>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 3 }}
              >Create Task</Button>
            </Form>

          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default CreateTask;