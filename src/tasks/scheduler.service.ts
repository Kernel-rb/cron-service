import { Injectable, OnModuleInit } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CronJob } from 'cron';
import { Task } from '@prisma/client';

@Injectable()
export class SchedulerService implements OnModuleInit {
  constructor(private tasksService: TasksService) {}

  async onModuleInit() {
    await this.scheduleTasks();
  }

  async scheduleTasks() {
    const tasks = await this.tasksService.listTasks();
    tasks.forEach((task) => {
      const cronTime = `0 ${task.time.split(':')[1]} ${task.time.split(':')[0]} * * ${task.daysOfWeek.join(',')}`;
      const job = new CronJob(
        cronTime,
        async () => {
          console.log(`Executing task: ${task.title}`);
          await this.tasksService.updateTask(task.id, { isExecuted: true });
        },
        null,
        true,
        task.timezone,
      );
      job.start();
    });
  }
}
