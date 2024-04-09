import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Users email',
    example: '121313',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Users Password',
    example: '23e333',
  })
  @IsNotEmpty()
  @IsString()
  pass: string;
}
