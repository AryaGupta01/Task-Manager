import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  IconButton,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import { getTasks, deleteTask, updateTask } from '../../api';

const TaskListPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [sortOption, setSortOption] = useState('dueDate');
  const [filterOption, setFilterOption] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getTasks();
        setTasks(response);        
      } catch (error) {
        setError('Failed to load tasks.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);
  useEffect(() => { if (error) { setTimeout(() => setError(null), 5000); } }, [error]);

  const filteredTasks = () => {
    let filtered = tasks;
  
    if (filterOption === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filterOption === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    }
  
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (event) => {


    setFilterOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (id) => {
     navigate(`/tasks/${id}`);
  };
  const handleEditTask = (taskId) => {
   navigate(`/edit/${taskId}`);
    // Navigate to edit task page with taskId
  };

  const handleDeleteTask = async (taskId) => {
    setError(null);
    setSuccessMessage(null);
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
      setSuccessMessage('Task deleted successfully.');
    } catch (error) {
      setError('Failed to delete task.');
    } finally {
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleToggleComplete = async (task) => {
    setError(null);
    setSuccessMessage(null);
    try {
      await updateTask(task._id, { ...task, completed: !task.completed });
      setTasks(tasks.map(t => t._id === task._id ? { ...t, completed: !t.completed } : t));
       setSuccessMessage(task.completed ? 'Task marked as pending.' : 'Task marked as complete.');
    } catch (error) {
      setError('Failed to update task completion status.');
    } finally {
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };
  useEffect(() => { if (successMessage) { setTimeout(() => setSuccessMessage(null), 3000); } }, [successMessage]);

    const sortedTasks = () => {
      let sorted = [...filteredTasks()];
    
      if (sortOption === "dueDate") {
        sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      } else if (sortOption === "priority") {
        sorted.sort((a, b) => {
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
      }
    
      return sorted;
    };

  return (
    <Box sx={{ margin: 2 }}>
    {isLoading && <Alert severity="info">Loading tasks...</Alert>}
    {error && <Alert severity="error">{error}</Alert>}
    {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <Typography variant="h4" gutterBottom>Task List</Typography>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sortOption}
            label="Sort"
            onChange={handleSortChange}
            size='small'
           
          >
            <MenuItem value="dueDate">Due Date</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            value={filterOption}
            label="Filter"
            onChange={handleFilterChange}
            size='small'
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search Task"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
        />
        <Button variant="contained" color="primary"  onClick={() => navigate('/create')}>
          Add New Task
        </Button>
      </Box>
      <List>
        {sortedTasks().map((task) => (
          <ListItem key={task._id} divider>
            <ListItemText
              primary={task.title}
              secondary={`Due: ${task.dueDate || 'Not set'} | Priority: ${task.priority}`}
              sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            />
                <IconButton edge="end" aria-label="view details" onClick={() => handleViewDetails(task._id)} >
              <Button size="small">Details</Button>
            </IconButton>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditTask(task._id)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="complete" onClick={() => handleToggleComplete(task)}>
                {task.completed ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon />}
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task._id)}>
                <DeleteIcon />
              </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskListPage;