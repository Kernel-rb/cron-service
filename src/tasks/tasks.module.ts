import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from '../prisma.service';
import { SchedulerService } from './scheduler.service';

@Module({
  providers: [TasksService, PrismaService, SchedulerService],
  controllers: [TasksController],
})
export class TasksModule {}
