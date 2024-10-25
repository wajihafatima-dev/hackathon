// models/taskModel.js
const mongoose = require('mongoose');

// Create a schema for the Task
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now, // Set default to current date
  },
});

// Create the Task model
export const taskModel = mongoose.models.Task || mongoose.model('Task', TaskSchema);


