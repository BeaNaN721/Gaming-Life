import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Checkin } from './checkin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import { Between, Repository } from 'typeorm';
import { CreateCheckinDto } from './checkin.dto';

@Injectable()
export class CheckinService {
  constructor(
    @InjectRepository(Checkin)
    private readonly checkinRepo: Repository<Checkin>,
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ){}

  async create(userId: number, dto: CreateCheckinDto){
    const task = await this.taskRepo.findOne({where:{id: dto.taskId, userId}});
    if (!task) throw new NotFoundException('Task not found');
    if(!task.isActive) throw new BadRequestException('Task is inactive');

    const { startOfToday, startOfTomorrow } = this.getTodayRange();

    const existed = await this.checkinRepo.findOne({
      where:{
        userId, 
        taskId: dto.taskId, 
        completedAt: Between(startOfToday, startOfTomorrow),
      }
    });
    if(existed) throw new BadRequestException('Task already checked in today');

    const checkin = this.checkinRepo.create({userId, taskId: dto.taskId});
    return this.checkinRepo.save(checkin);
  }

  async findToday(userId: number){
    const { startOfToday, startOfTomorrow } = this.getTodayRange();
    return await this.checkinRepo.find({
      where:{
        userId,
        completedAt: Between(startOfToday, startOfTomorrow),
      },
      relations: { task: true },
      order: { completedAt: 'DESC' },
    });
  }

  async getStreak(userId: number){
    const logs = await this.checkinRepo.find({
      where:{userId},
      order: { completedAt: 'DESC' },
    });
    if(logs.length === 0) return {streak: 0};

    const completedDays = new Set(
      logs.map((log) => {
        const d = new Date(log.completedAt);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      }),
    );

    let streak = 0;
    let cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    while(completedDays.has(cursor.getTime())){
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }

    return {streak};
  }

  private getTodayRange(){
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return { startOfToday, startOfTomorrow };
  }
}
