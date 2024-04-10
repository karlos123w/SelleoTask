import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import axios from 'axios';
import { ForbiddenException } from '@nestjs/common';

jest.mock('axios');

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
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
      id: '1',
      firstName: 'User 1',
      email: 'user@gmail.com',
      hashedPass: '12sbdt38dy3',
      createdAt:
        'Wed Apr 10 2024 00:20:33 GMT+0200 (Central European Summer Time)',
      lastName: 'Wilkowski',
      phoneNumber: 123456789,
      shirtSize: 34,
      preferredTechnology: 'Node',
      token: '',
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
});
