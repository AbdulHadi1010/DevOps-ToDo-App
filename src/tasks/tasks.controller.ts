import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async create(@Body() task: Task) {
    return this.tasksService.create(task);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.tasksService.delete(id);
  }
}