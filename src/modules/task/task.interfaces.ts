import { Document } from 'mongoose';

export enum TaskStatus {
  IN_PROGRESS,
  DONE,
}

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: number;
}
