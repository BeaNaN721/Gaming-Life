import { Controller, Patch, Delete, Param, ParseIntPipe, Req, Body, Get, Post } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { TaskService } from './task.service';
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get()
  list(@Req() req: { user: { userId: number } }) {
    return this.taskService.findMyActiveTasks(req.user.userId);
  }
  @Post()
  create(
    @Req() req: { user: { userId: number } },
    @Body() dto: CreateTaskDto,
  ) {
    return this.taskService.create(req.user.userId, dto);
  }
  @Patch(':id')
  update(
    @Req() req: { user: { userId: number } },
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.update(req.user.userId, id, dto);
  }
  @Delete(':id')
  remove(
    @Req() req: { user: { userId: number } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.taskService.remove(req.user.userId, id);
  }
}