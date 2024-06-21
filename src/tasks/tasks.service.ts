import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async listTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTask(taskId: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }
    return task;
  }

  async updateTask(
    taskId: number,
    data: Prisma.TaskUpdateInput,
  ): Promise<Task> {
    return this.prisma.task.update({ where: { id: taskId }, data });
  }

  async deleteTask(taskId: number): Promise<Task> {
    const task = await this.prisma.task.delete({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }
    return task;
  }

  async runTask(taskId: number): Promise<{ message: string }> {
    const task = await this.getTask(taskId);
    console.log(`Manually executing task: ${task.title}`);

    try {
      await this.updateTask(taskId, { isExecuted: true, status: 'success' });
      return { message: `Task ${task.title} is running` };
    } catch (error) {
      await this.updateTask(taskId, { status: 'failed' });
      throw new Error(`Failed to run task ${task.title}: ${error.message}`);
    }
  }

  async getTaskStatus(taskId: number): Promise<{ status: string }> {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }
    return { status: task.status };
  }
}
