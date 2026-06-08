import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CreateCheckinDto } from './checkin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('checkins')
@UseGuards(AuthGuard('jwt'))
export class CheckinController {
  constructor(private readonly checkinService: CheckinService){}

  @Post()
  async create(
    @Req() req:{user: {userId: number}}, 
    @Body() dto: CreateCheckinDto,
  ){
    return this.checkinService.create(req.user.userId, dto);
  }

  @Get('today')
  today(@Req() req: {user: {userId: number}}) {
    return this.checkinService.findToday(req.user.userId);
  }

  @Get('streak')
  streak(@Req() req: {user: {userId: number}}) {
    return this.checkinService.getStreak(req.user.userId);
  }
}
