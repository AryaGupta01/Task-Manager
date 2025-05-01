const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
app.use(express.urlencoded({extended: true}));
// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
