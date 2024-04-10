import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dtos/sing.up.dto';
import { SwaggerForCreateUser } from './swagger/sing.in.swagger';
import { UsersSignUp } from './swagger/titles/users.titles.swagger';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signUp')
  @SwaggerForCreateUser
  @UsersSignUp
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.usersService.signUp(signUpDto);
  }
}
