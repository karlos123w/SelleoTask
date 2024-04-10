import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../_users/users.service';
import { SignInDto } from './dtos/sign.in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findUserByEmail(signInDto.email);

    const PasswordMatch = await this.usersService.comparePasswords(
      signInDto.pass,
      user.hashedPass,
    );

    if (!PasswordMatch) throw new UnauthorizedException(`Incorrect password`);
    const token = await this.usersService.generateJwtToken(
      user.id,
      user.firstName,
    );
    return {
      ...user,
      token,
    };
  }

  async refreshAuthToken(userId: string) {
    const refreshedAuthToken = await this.usersService.refreshAuthToken(userId);
    return refreshedAuthToken;
  }
}
