import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dtos/sign.in.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthSignIn } from './swagger/titles/auth.titles.swagger';
import { SwaggerForLoginUser } from './swagger/sign.in.swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  @SwaggerForLoginUser
  @AuthSignIn
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }
}
