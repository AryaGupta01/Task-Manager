const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskDistribution,
  getCompletionRate
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');


// Protect all routes in this router
router.use(protect);

// POST / (createTask): Create a new task.
router.route('/crt').post(createTask);

// GET / (getTasks): Get all tasks.
router.route('/').get(getTasks);

// GET /:id (getTaskById): Get a task by ID.
router.route('/:id').get(getTaskById);

// PUT /:id (updateTask): Update a task by ID.
router.route('/:id').put(updateTask);
// DELETE /:id (deleteTask): Delete a task by ID.
router.route('/:id').delete(deleteTask);

// GET /analytics/distribution (getTaskDistribution): Get task distribution.
router.route('/analytics/distribution').get(getTaskDistribution);

// GET /analytics/completionRate (getTaskCompletionRate): Get task completion rate.
router.route('/analytics/completionRate').get(getCompletionRate);



module.exports = router;
