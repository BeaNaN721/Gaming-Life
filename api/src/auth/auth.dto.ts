import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto{
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string; 

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}

export class LoginDto{
  @IsString()
  username: string;

  @IsString()
  password: string;
}