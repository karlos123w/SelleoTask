import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import axios from 'axios';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('axios');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    const signInDto = {
      email: 'user@gmail.com',
      pass: 'password123',
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
    it('should sign in user', async () => {
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const result = await service.signIn(signInDto);
      expect(result).toEqual(mockData);
    });

    it('should throw UnathorizedException if incorrect password', async () => {
      (axios.post as jest.Mock).mockRejectedValueOnce({
        response: { status: 401 },
      });

      await expect(service.signIn(signInDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
