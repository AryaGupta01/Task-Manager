import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getTaskById, updateTask } from "../../api";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({});

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    dueDate: Yup.date().required("Due Date is required"),
    priority: Yup.string()
      .required("Priority is required")
      .oneOf(["High", "Medium", "Low"], "Invalid Priority"),
  });

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const data = await getTaskById(id);
        // Format the date for the input field
        const formattedDueDate = data.dueDate
          ? new Date(data.dueDate).toISOString().split("T")[0]
          : "";
        setTask({ ...data, dueDate: formattedDueDate });
      } catch (error) {
        if (error.response) {
          console.error(
            "Server responded with:",
            error.response.status,
            error.response.data
          );
        }
        console.error("Error fetching task details:", error);
      }
    };
    fetchTaskDetails();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await updateTask(id, values);
    } catch (error) {
      if (error.response) {
        console.error(
          "Server responded with:",
          error.response.status,
          error.response.data
        );
      }
      console.error("Error updating task:", error);
    }
    navigate("/tasks");
  };

  if (!task.title) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    title: task.title || "",
    description: task.description || "",
    dueDate: task.dueDate || "",
    priority: task.priority || "",
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Task
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values}) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Title"
                    name="title"
                    error={touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Description"
                    name="description"
                    
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Due Date"
                    name="dueDate"
                    
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.dueDate && !!errors.dueDate}
                    helperText={touched.dueDate && errors.dueDate}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={touched.priority && Boolean(errors.priority)}
                  >
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Field
                      as={Select}
                      labelId="priority-label"
                      id="priority"
                      name="priority"
                      label="Priority"
                      
                    >
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Field>
                    {touched.priority && errors.priority && (
                      <div style={{ color: "red" }}>{errors.priority}</div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Update Task
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default EditTask;
