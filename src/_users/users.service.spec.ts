import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../_users/users.module';
import { Users } from '../_users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConflictException } from '@nestjs/common';
jest.mock('@nestjs/common', () => ({
  Injectable: jest.fn(() => {}),
  BadRequestException: jest.fn(() => {}),
  ConflictException: jest.fn(() => {}),
  ForbiddenException: jest.fn(() => {}),
  NotFoundException: jest.fn(() => {}),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mocked_jwt_token'),
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
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
      controllers: [UsersController],
      providers: [
        UsersModule,
        {
          provide: 'AUTH_SECRET',
          useValue: 'private_key',
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    cacheManager = module.get('CACHE_MANAGER') as any;
  });

  describe('findAllUsers', () => {
    it('Should find all users', async () => {
      const mockedSignedUser = {
        id: {
          id: 1,
          firstName: 'User 1',
          email: 'jannko@wp.pl',
          hashedPass: '12sbdt38dy3',
          createdAt:
            'Wed Apr 10 2024 00:20:33 GMT+0200 (Central European Summer Time)',
          lastName: 'Wilkowski',
          phoneNumber: 123456789,
          shirtSize: 34,
          preferredTechnology: 'Node',
          token: '',
          expiration: 1,
          role: 'user',
        },
      };

      const mockedUsers = [
        {
          id: 1,
          firstName: 'User 1',
          email: 'jannko@wp.pl',
          hashedPass: '12sbdt38dy3',
          createdAt:
            'Wed Apr 10 2024 00:20:33 GMT+0200 (Central European Summer Time)',
          lastName: 'Wilkowski',
          phoneNumber: 123456789,
          shirtSize: 34,
          preferredTechnology: 'Node',
          token: '',
          expiration: 1,
          role: 'user',
        },
        {
          id: 2,
          firstName: 'User 1',
          email: 'jannko@wp.pl',
          hashedPass: '12sbdt38dy3',
          createdAt:
            'Wed Apr 10 2024 00:20:33 GMT+0200 (Central European Summer Time)',
          lastName: 'Wilkowski',
          phoneNumber: 123456789,
          shirtSize: 34,
          preferredTechnology: 'Node',
          token: '',
          expiration: 1,
          role: 'user',
        },
      ];
      jest.spyOn(service, 'findAllUsers').mockResolvedValueOnce(mockedUsers);

      const result = await service.findAllUsers(mockedSignedUser.id.id);
      expect(result).toEqual(mockedUsers);
    });
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const signUpDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        pass: 'password123',
        shirtSize: 47,
        phoneNumber: 321987654,
        preferredTechnology: 'JAVA',
        role: 'user',
      };

      const result = await service.signUp(signUpDto);

      expect(result.firstName).toEqual(signUpDto.firstName);
      expect(result.lastName).toEqual(signUpDto.lastName);
      expect(result.email).toEqual(signUpDto.email);
      expect(result.hashedPass).not.toEqual(signUpDto.pass);
      expect(result.token).toBeDefined();
    });

    it('should throw ConflictException if user with the same email already exists', async () => {
      const signUpDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        pass: 'password123',
        shirtSize: 47,
        phoneNumber: 321987654,
        preferredTechnology: 'JAVA',
        role: 'user',
      };

      await service.signUp(signUpDto);

      await expect(service.signUp(signUpDto)).rejects.toThrowError(
        ConflictException,
      );
    });
  });
});
