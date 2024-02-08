import Joi from 'joi';

import { objectId } from '../validate/custom.validation';
import { TaskStatus } from './task.interfaces';

export const createTask: Record<string, any> = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().iso().required(),
  status: Joi.number().valid(TaskStatus.DONE, TaskStatus.IN_PROGRESS),
};

export const getTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
};

export const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      dueDate: Joi.date().iso().required(),
      status: Joi.number().valid(TaskStatus.DONE, TaskStatus.IN_PROGRESS),
    })
    .min(1),
};

export const deleteTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
};
