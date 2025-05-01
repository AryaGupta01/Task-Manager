const Task = require("../models/Task");

// @desc    Create a new task
// @route   POST /tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const task = new Task({ title, description, dueDate, priority });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get task distribution by priority
// @route   GET /tasks/analytics/distribution
// @access  Private
const getTaskDistribution = async (req, res) => {
  try {
    const distribution = await Task.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);
    res.status(200).json(distribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get task completion rate
// @route   GET /tasks/analytics/completionRate
// @access  Private
const getCompletionRate = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ completed: true });
    const completionRate =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    console.log(completionRate);
    
    res.status(200).json({ completionRate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get all tasks
// @route   GET /tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a task by ID
// @route   GET /tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a task
// @route   PUT /tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  console.log("updateTask Called");

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
createTask,
getTasks,
getTaskById,
updateTask,
deleteTask,
getTaskDistribution, getCompletionRate};

