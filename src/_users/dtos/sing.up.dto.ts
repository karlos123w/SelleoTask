import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'Users Password',
    example: '23e333',
  })
  @IsNotEmpty()
  @IsString()
  pass: string;

  @ApiProperty({
    description: 'Users Email',
    example: 'jonas@wp.pl',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Users first name',
    example: 'Jonas',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Users last name',
    example: 'Tolkier',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Users phone number',
    example: '123654987',
  })
  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @ApiProperty({
    description: 'Users shirt size',
    example: '36',
  })
  @IsNotEmpty()
  @IsNumber()
  shirtSize: number;

  @ApiProperty({
    description: 'Users preffered technology',
    example: 'Node',
  })
  @IsNotEmpty()
  @IsString()
  preferredTechnology: string;

  @ApiProperty({
    description: 'Users role',
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  role: string;
}
