import { Module } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CheckinController } from './checkin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/task.entity';
import { Checkin } from './checkin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checkin, Task,])],
  providers: [CheckinService],
  controllers: [CheckinController]
})
export class CheckinModule { }
