import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dtos/sing.up.dto';
import { SwaggerForCreateUser } from './swagger/sing.in.swagger';
import {
  UsersFindAll,
  UsersSignUp,
} from './swagger/titles/users.titles.swagger';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get.user.decorator';
import { SignedUser } from '../auth/user.interface';
import { SwaggerForFindAllUsers } from './swagger/find.all.swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @SwaggerForCreateUser
  @UsersSignUp
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.usersService.signUp(signUpDto);
  }

  @Get('all')
  @SwaggerForFindAllUsers
  @UsersFindAll
  async findAllUsers(@GetUser() signedUser: SignedUser) {
    return await this.usersService.findAllUsers(signedUser.id);
  }
}
