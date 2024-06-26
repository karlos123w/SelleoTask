import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignUpDto } from 'src/_users/dtos/sing.up.dto';

@Injectable()
export class UsersService {
  private readonly jwtSecretKey = process.env.AUTH_SECRET;

  constructor(
    @InjectRepository(Users)
    private userModel: Repository<Users>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const newDate = new Date().toString();
    const foundUser = await this.userModel.findOne({
      where: { email: signUpDto.email },
    });
    if (foundUser)
      throw new ConflictException(`User with that email already exist`);

    const hashedPassword = await this.hashPassword(signUpDto.pass);

    const registeredUser = this.userModel.create({
      ...signUpDto,
      createdAt: newDate,
      hashedPass: hashedPassword,
    });

    const token = await this.generateJwtToken(
      registeredUser.id,
      registeredUser.firstName,
    );

    await this.userModel.save(registeredUser);

    return {
      ...registeredUser,
      token,
    };
  }

  async findAllUsers(signedUser: number) {
    await this.findUserById(signedUser);

    const foundAllUsers = await this.userModel.find();
    if (!foundAllUsers) return [];

    return foundAllUsers;
  }

  async findUserById(userId: number) {
    const foundUser = await this.userModel.findOne({ where: { id: userId } });
    if (!foundUser) throw new NotFoundException(`User not found`);

    return foundUser;
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ where: { email: email } });

    if (!user) throw new NotFoundException(`User with that email not found`);

    return user;
  }

  async findAdmin(userId: number) {
    const foundAdmin = await this.userModel.findOne({
      where: {
        id: userId,
        role: 'admin',
      },
    });
    if (!foundAdmin)
      throw new ForbiddenException(
        'To execute this command you must have the admin role',
      );

    return foundAdmin;
  }

  async isAdmin(userId: number) {
    const foundAdmin = await this.userModel.findOne({
      where: {
        id: userId,
        role: 'admin',
      },
    });
    if (!foundAdmin) return false;

    return true;
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async generateJwtToken(userId: number, firstName: string): Promise<string> {
    const expiresIn = '1d';

    return jwt.sign({ sub: userId, firstName }, this.jwtSecretKey, {
      expiresIn,
    });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async refreshAuthToken(userId: number): Promise<string | null> {
    try {
      const user = await this.userModel.findOne({ where: { id: userId } });
      if (!user) return null;
      const expiresIn = '1d';

      const token = jwt
        .sign({ sub: user.id, firstName: user.firstName }, this.jwtSecretKey, {
          expiresIn,
        })
        .toString();
      return token;
    } catch (error) {
      throw new BadRequestException(
        `Błąd w momencie odświeżania tokenu -(prawdopodobnie źle podane id)`,
      );
    }
  }
}
