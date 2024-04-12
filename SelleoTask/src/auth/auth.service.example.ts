import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import axios from 'axios';
import { Users } from '../_users/entities/users.entity';
import { UsersModule } from '../_users/users.module';
import { UsersService } from '../_users/users.service';
import { AuthService } from './auth.service';

jest.mock('axios');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

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
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('signIn', () => {
    const signInDto = {
      email: 'admin@wp.pl',
      pass: '1234',
    };

    const mockUser = {
      id: 3,
      firstName: 'Karol',
      email: 'admin@wp.pl',
      hashedPass:
        '$2b$10$BrgYg83b0FLN7Dt0I/bcN.THiH/6hGfSNGRyHhXvdvA5Y1wrowmty',
      createdAt:
        'Wed Apr 10 2024 08:16:49 GMT+0200 (Central European Summer Time)',
      lastName: 'Kowalski',
      phoneNumber: 123456789,
      shirtSize: 34,
      preferredTechnology: 'Node',
      token: '',
      role: 'user',
    };

    it('should sign in user', async () => {
      jest
        .spyOn(usersService, 'findUserByEmail')
        .mockImplementation(async () => mockUser);
      (axios.post as jest.Mock).mockResolvedValue({ data: mockUser });

      const result = await service.signIn(signInDto);
      expect(result).toEqual(mockUser);
    });
  });
});
