import { IsInt, Min } from 'class-validator';

export class CreateCheckinDto {
  @IsInt()
  @Min(1)
  taskId: number;
}