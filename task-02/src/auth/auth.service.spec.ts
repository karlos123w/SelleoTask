import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import axios from 'axios';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../_users/users.service';
import { Users } from '../_users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../_users/users.module';

jest.mock('axios');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Users],
          synchronize: true,
        }),
      ],
      providers: [AuthService, UsersModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    const signInDto = {
      email: 'jannko@wp.pl',
      pass: '1234',
    };

    const mockData = {
      id: '3',
      firstName: 'Karol',
      email: 'jannko@wp.pl',
      hashedPass:
        '$2b$10$BrgYg83b0FLN7Dt0I/bcN.THiH/6hGfSNGRyHhXvdvA5Y1wrowmty',
      createdAt:
        'Wed Apr 10 2024 08:16:49 GMT+0200 (Central European Summer Time)',
      lastName: 'Wilczak	',
      phoneNumber: 123456789,
      shirtSize: 34,
      preferredTechnology: 'Node',
      token: '',
    };
    it('should sign in user', async () => {
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const result = await service.signIn(signInDto);
      expect(result).toEqual(mockData);
    });

    // it('should throw UnathorizedException if incorrect password', async () => {
    //   (axios.post as jest.Mock).mockRejectedValueOnce({
    //     response: { status: 401 },
    //   });

    //   await expect(service.signIn(signInDto)).rejects.toThrowError(
    //     UnauthorizedException,
    //   );
    // });
  });
});
