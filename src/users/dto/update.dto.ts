import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  firstName: string;
  @MinLength(6)
  password: string;
  lastName?: string;
}
