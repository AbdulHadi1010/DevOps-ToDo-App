import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.interface';
import logger from '../logger';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async create(task: Task): Promise<Task> {
    const createdTask = new this.taskModel(task);
    const result = await createdTask.save();
    logger.info('Task created', { task: result });
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    logger.info('Tasks retrieved', { count: tasks.length });
    return tasks;
  }

async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    
    if (!task) {
        logger.error(`Task with ID ${id} not found`)
      throw new NotFoundException(`Task with ID ${id} not found`);
    }else{
        logger.info('Task retrieved', { id });
    }
    
    return task;
  }

  async update(id: string, task: Task): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
    if (!updatedTask) {
        logger.error(`Task with ID ${id} not found`)
      throw new NotFoundException(`Task with ID ${id} not found`);
    }else{
        logger.info('Task updated', { id, task: updatedTask });
    }
    return updatedTask;
  }

  async delete(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) {
        logger.error(`Task with ID ${id} not found`)
      throw new NotFoundException(`Task with ID ${id} not found`);
      
    }else{
        logger.info('Task deleted', { id });
    }
    return deletedTask;
  }
}