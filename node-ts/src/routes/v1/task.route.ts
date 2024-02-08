import express, { Router } from 'express';

import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { taskController, taskValidation } from '../../modules/task';

const router: Router = express.Router();

router
  .route('/')
  .post(auth(), validate(taskValidation.createTask), taskController.createTask)
  .get(auth(), taskController.getTasks);

router
  .route('/:taskId')
  .get(auth(), validate(taskValidation.getTask), taskController.getTask)
  .patch(auth(), validate(taskValidation.updateTask), taskController.updateTask)
  .delete(auth(), validate(taskValidation.deleteTask), taskController.deleteTask);

export default router;
