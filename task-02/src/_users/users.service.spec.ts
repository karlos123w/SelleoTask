import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import axios from 'axios';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersModule } from './users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

jest.mock('axios');

describe('UsersService', () => {
  let service: UsersService;

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
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  describe('signUp', () => {
    const signUpDto = {
      email: 'user@gmail.com',
      pass: 'password123',
      firstName: 'User 1',
      lastName: 'Wilkowski',
      phoneNumber: 123456789,
      shirtSize: 34,
      preferredTechnology: 'Node',
    };

    const mockData = {
      firstName: 'User 1',
      email: 'user@gmail.com',
      lastName: 'Wilkowski',
      phoneNumber: 123456789,
      shirtSize: 34,
      preferredTechnology: 'Node',
      id: '1',
    };
    it('should sign Up an user and create user object', async () => {
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const result = await service.signUp(signUpDto);
      expect(result).toEqual(mockData);
    });

    it('should throw Forbidden Exception if user with given email already exist', async () => {
      (axios.post as jest.Mock).mockResolvedValueOnce({
        response: { status: 403 },
      });

      await expect(service.signUp(signUpDto)).rejects.toThrowError(
        ForbiddenException,
      );
    });
  });

  describe('findAllUsers', () => {
    const mockUsers = [
      {
        // id: '1',
        // firstName: 'User 1',
        email: 'dawko@wp.pl	',
        // hashedPass: '12sbdt38dy3',
        // createdAt:
        //   'Wed Apr 10 2024 00:20:33 GMT+0200 (Central European Summer Time)',
        // lastName: 'Wilkowski',
        // phoneNumber: 123456789,
        // shirtSize: 34,
        // preferredTechnology: 'Node',
        // token: '',
      },
    ];
    const mockedSignedUser = {
      id: {
        id: '2',
        firstName: 'Konek',
        email: 'jonek@wp.pl	',
        hashedPass:
          '$2b$10$SBFv1nHkafbZE5p7vbtpHO1ffGmH6PD3WD9bpysKxqtlm6qyhKN9K	',
        createdAt:
          'Wed Apr 10 2024 04:52:55 GMT+0200 (Central European Summer Time)',
        lastName: 'Kowal',
        phoneNumber: 987654321,
        shirtSize: 34,
        preferredTechnology: 'Java',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImZpcnN0TmFtZSI6IlVzZXIgMSIsImlhdCI6MTcxMjczMTc4OCwiZXhwIjoxNzEyODE4MTg4fQ.gGwPmr-VPaQR0E1p-u86WV1ppnsVZntESWsGryvF8B0',
        expiration: 1,
      },
    };
    it('should return all users for signedUser', async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUsers });

      const result = await service.findAllUsers('2');
      expect(result).toEqual(mockUsers);
    });

    it('should throw NotFoundException if user not found', async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        response: { status: 404 },
      });

      await expect(
        service.findAllUsers(mockedSignedUser.id.id),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
