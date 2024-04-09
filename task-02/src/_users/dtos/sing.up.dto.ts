import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  pass: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @IsNotEmpty()
  @IsNumber()
  shirtSize: number;

  @IsNotEmpty()
  @IsString()
  preferredTechnology: string;
}
