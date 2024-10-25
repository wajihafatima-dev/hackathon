// models/taskModel.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define the Task interface
export interface ITask extends Document {
  title: string;
  content: string;
  addedDate: Date;
}

// Create a schema for the Task
const TaskSchema: Schema = new Schema({
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
export const taskmodel = mongoose.models.tasks || mongoose.model('tasks', TaskSchema);
