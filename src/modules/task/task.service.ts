import httpStatus from 'http-status';
import mongoose from 'mongoose';

import ApiError from '../errors/ApiError';
import { ITask } from './task.interfaces';
import Task from './task.model';

/**
 * Create a task
 * @param {ITask} taskBody
 * @returns {Promise<ITask>}
 */
export const createTask = async (taskBody: ITask): Promise<ITask> => {
  return Task.create(taskBody);
};

/**
 * get tasks
 * @returns {Promise<QueryResult>}
 */
export const queryTasks = async (): Promise<ITask[]> => {
  const tasks = await Task.find().exec();
  return tasks;
};

/**
 * Get task by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ITask | null>}
 */
export const getTaskById = async (id: mongoose.Types.ObjectId): Promise<ITask | null> => Task.findById(id);

/**
 * Update task by id
 * @param {mongoose.Types.ObjectId} taskId
 * @param {ITask} updateBody
 * @returns {Promise<ITask | null>}
 */
export const updateTaskById = async (taskId: mongoose.Types.ObjectId, updateBody: ITask): Promise<ITask | null> => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  Object.assign(task, updateBody);
  await task.save();
  return task;
};

/**
 * Delete task by id
 * @param {mongoose.Types.ObjectId} userId
 * @returns {Promise<ITask | null>}
 */
export const deleteTaskById = async (userId: mongoose.Types.ObjectId): Promise<ITask | null> => {
  const task = await getTaskById(userId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  await task.deleteOne();
  return task;
};
