import axios from 'axios';


const API_BASE_URL = 'http://localhost:5000/api'; // Corrected API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  config => {
    
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Authentication API Calls
export const login = async (userData) => {
  console.log(userData)
  try {
    const response = await api.post('/users/login', userData);
    
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const signup = async (userData) => {
  
  try {
    const response = await api.post('/users/register', userData);
    console.log(response.data,"Response Data From api.js");
    
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Task API Calls
export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks/crt', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const getTasks = async (params = {}) => {
  try {
    const response = await api.get('/tasks/', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
    
  }
};
// GetTakById
export const getTaskById = async (taskId) => {
  try {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with ID ${taskId}:`, error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${taskId}:`, error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with ID ${taskId}:`, error);
    throw error;
  }
};

// Dashboard API Calls
export const getTaskDistribution = async () => {
  try {
    const response = await api.get('/tasks/analytics/distribution'); // Assuming backend endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching task distribution:', error);
    throw error;
  }
};

export const getCompletionRate = async () => {
  try {
    const response = await api.get('/tasks/analytics/completionRate'); // Assuming backend endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching completion rate:', error);
    throw error;
  }
};

