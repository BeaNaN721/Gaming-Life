import { IsBoolean, IsOptional, IsString, Length, MinLength } from "class-validator";

export class CreateTaskDto{
  @IsString()
  @Length(1, 50)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
export class UpdateTaskDto{
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}