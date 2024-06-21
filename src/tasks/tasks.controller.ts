import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task as TaskModel } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() taskData: TaskModel): Promise<TaskModel> {
    return this.tasksService.createTask(taskData);
  }

  @Get()
  async listTasks(): Promise<TaskModel[]> {
    return this.tasksService.listTasks();
  }

  @Get(':id')
  async getTask(@Param('id') id: string): Promise<TaskModel> {
    return this.tasksService.getTask(Number(id));
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskData: TaskModel,
  ): Promise<TaskModel> {
    return this.tasksService.updateTask(Number(id), taskData);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<{ message: string }> {
    await this.tasksService.deleteTask(Number(id));
    return { message: `Task with ID ${id} has been deleted` };
  }

  @Patch(':id/run')
  async runTask(@Param('id') id: string): Promise<{ message: string }> {
    return this.tasksService.runTask(Number(id));
  }

  @Get(':id/status')
  async getTaskStatus(@Param('id') id: string): Promise<{ status: string }> {
    return this.tasksService.getTaskStatus(Number(id));
  }
}
