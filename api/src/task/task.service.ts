import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ){}

  findMyActiveTasks(userId: number){
    return this.taskRepo.find({
      where: {userId, isActive: true},
      order: {createdAt: 'DESC'},
    });
  }

  async create(userId: number, dto: CreateTaskDto){
    const task = this.taskRepo.create({ ...dto, userId})
    return this.taskRepo.save(task);
  }

  async update(userId: number, taskId: number, dto: UpdateTaskDto){
    const task = await this.findOwnedTask(userId, taskId);
    Object.assign(task, dto);
    return this.taskRepo.save(task);
  }

  async remove(userId: number, taskId: number){
    const task = await this.findOwnedTask(userId, taskId);
    await this.taskRepo.update(taskId, {isActive: false});
    return {message: 'Task deleted successfully'};
  }

  private async findOwnedTask(userId: number, taskId: number){
    const task = await this.taskRepo.findOne({
      where: {id: taskId, userId},
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}
