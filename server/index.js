const express = require('express');
const router = express.Router();
const Tasks = require('../models/schema.js'); // Your Mongoose Task model

router.post('/api/v1/tasks', async (req, res) => {
  try {
    const { name, deadline, completed, color } = req.body; // Extract task details from request body

    // Create a new task using Mongoose Task model
    const newTask = new Task({
      name,
      deadline,
      completed,
      color
    });

    // Save the new task to the database
    const savedTask = await newTask.save();

    res.status(201).json(savedTask); // Return the saved task as JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
