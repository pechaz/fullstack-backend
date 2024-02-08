import mongoose from 'mongoose';

import toJSON from '../toJSON/toJSON';
import { ITask, TaskStatus } from './task.interfaces';

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 128,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
      validate(value: Date) {
        if (value <= new Date()) {
          throw new Error('due date should be for ongoing date');
        }
      },
    },
    status: {
      type: Number,
      enum: TaskStatus,
      default: TaskStatus.IN_PROGRESS,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.plugin(toJSON);

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
