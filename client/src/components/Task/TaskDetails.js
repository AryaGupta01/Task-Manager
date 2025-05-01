import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Card, CardContent, CircularProgress, Box, Button, CardActions, Grid } from '@mui/material';
import { getTaskById } from '../../api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchTaskDetails = async () => {
      try {
        const response = await getTaskById(id);
        if (!response) {
            setError('Task not found.');
            setLoading(false);
            return;
        }
        setTask(response);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  const navigate = useNavigate();
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">Error loading task details: {error.message}</Typography>
    );
  }

  if (!task) {
    return (
      <Typography>Task not found.</Typography>
    );
  }

  return (
    <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Task Details
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Title: {task.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Description: {task.description}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Due Date: {new Date(task.dueDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Priority: {task.priority}
                    </Typography>
                    <Typography variant="body2">
                        Status: {task.completed ? 'Completed' : 'Pending'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button startIcon={<EditIcon />} size="small" onClick={() => navigate(`/edit/${task._id}`)}>Edit</Button>
                    <Button startIcon={<DeleteIcon />} size="small">Delete</Button>
                </CardActions>
            </Card>
        </Grid>
    </Grid>
  );
};

export default TaskDetails;